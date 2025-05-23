import {
  Position,
  type InternalNode,
  getBezierPath,
  type GetBezierPathParams,
} from "@xyflow/svelte";

// returns the position (top,right,bottom or right) passed node compared to
function getParams(
  nodeA: InternalNode,
  nodeB: InternalNode,
): [number, number, Position] {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);

  const horizontalDiff = Math.abs(centerA.x - centerB.x);
  const verticalDiff = Math.abs(centerA.y - centerB.y);

  let position: Position;

  // when the horizontal difference between the nodes is bigger, we use Position.Left or Position.Right for the handle
  if (horizontalDiff > verticalDiff) {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
  } else {
    // here the vertical difference between the nodes is bigger, so we use Position.Top or Position.Bottom for the handle
    position = centerA.y > centerB.y ? Position.Top : Position.Bottom;
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return [x, y, position];
}

function getHandleCoordsByPosition(
  node: InternalNode,
  handlePosition: Position,
): [number, number] {
  // all handles are from type source, that's why we use handleBounds.source here
  const handle = node.internals.handleBounds?.source?.find(
    (h) => h.position === handlePosition,
  );

  if (!handle?.width || !handle?.height) {
    return [0, 0];
  }

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  // this is a tiny detail to make the markerEnd of an edge visible.
  // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
  // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  const x = node.internals.positionAbsolute.x + handle.x + offsetX;
  const y = node.internals.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
}

function getNodeCenter(node: InternalNode) {
  return {
    x: node.internals.positionAbsolute.x + (node.measured.width ?? 0) / 2,
    y: node.internals.positionAbsolute.y + (node.measured.height ?? 0) / 2,
  };
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source: InternalNode, target: InternalNode) {
  const [sx, sy, sourcePos] = getParams(source, target);
  const [tx, ty, targetPos] = getParams(target, source);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos,
  };
}

export function hashString(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

function calculateControlOffset(distance2: number, curvature: number) {
  //return curvature * 25 * Math.sqrt(Math.max(5, distance2));
  if (distance2 >= 0) {
    return distance2 * curvature * 0.5;
  }
  return curvature * 25 * Math.sqrt(-distance2);
}

function getControlWithCurvature({
  pos,
  x1, // source
  y1, // source
  x2, // target
  y2, // target
  c,
}: {
  pos: Position;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  c: number;
}): [number, number] {
  switch (pos) {
    case Position.Left:
      return [x1 - calculateControlOffset(x1 - x2, c), y1];
    case Position.Right:
      return [x1 + calculateControlOffset(x2 - x1, c), y1];
    case Position.Top:
      return [x1, y1 - calculateControlOffset(y1 - y2, c)];
    case Position.Bottom:
      return [x1, y1 + calculateControlOffset(y2 - y1, c)];
  }
}

function getBezierEdgeCenter({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourceControlX,
  sourceControlY,
  targetControlX,
  targetControlY,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourceControlX: number;
  sourceControlY: number;
  targetControlX: number;
  targetControlY: number;
}): [number, number, number, number] {
  const centerX =
    sourceX * 0.125 +
    sourceControlX * 0.375 +
    targetControlX * 0.375 +
    targetX * 0.125;
  const centerY =
    sourceY * 0.125 +
    sourceControlY * 0.375 +
    targetControlY * 0.375 +
    targetY * 0.125;
  const offsetX = Math.abs(centerX - sourceX);
  const offsetY = Math.abs(centerY - sourceY);
  return [centerX, centerY, offsetX, offsetY];
}

interface BezierWithStubOptions {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  curvature?: number;
  stubLength?: number;
}
const angleRangeByPosition: Record<Position, [number, number]> = {
  [Position.Top]: [(225 * Math.PI) / 180, (315 * Math.PI) / 180], // 225° to 315°
  [Position.Right]: [(-45 * Math.PI) / 180 + 2 * Math.PI, (45 * Math.PI) / 180], // 315° to 45°
  [Position.Bottom]: [(45 * Math.PI) / 180, (135 * Math.PI) / 180], // 45° to 135°
  [Position.Left]: [(135 * Math.PI) / 180, (225 * Math.PI) / 180], // 135° to 225°
};

/**
 * Creates a Bézier curve from source to a stub point offset
 * from the target (in the direction of source), with a straight
 * stub line connecting to the target. Returns the full path and
 * coordinates for labeling.
 */
export function getBezierPathWithTargetStub({
  sourceX,
  sourceY,
  sourcePosition = Position.Bottom,
  targetX,
  targetY,
  targetPosition = Position.Top,
  curvature = 0.25,
  stubLength = 10,
}: BezierWithStubOptions): [string, number, number, number, number] {
  // 1. Compute the direction vector from target to source
  let dx = sourceX - targetX;
  let dy = sourceY - targetY;

  let angle = Math.atan2(dy, dx);
  const normalizeAngle = (a: number) => (a + 2 * Math.PI) % (2 * Math.PI);
  angle = normalizeAngle(angle);

  // 1b. Clamp angle to valid range based on targetPosition
  const [minAngle, maxAngle] = angleRangeByPosition[targetPosition];
  const isAngleInRange = (a: number) => {
    if (minAngle < maxAngle) return a >= minAngle && a <= maxAngle;
    return a >= minAngle || a <= maxAngle; // handles wraparound (e.g., 315° to 45°)
  };

  if (!isAngleInRange(angle)) {
    const deltaToMin = Math.abs(normalizeAngle(angle - minAngle));
    const deltaToMax = Math.abs(normalizeAngle(angle - maxAngle));
    angle = deltaToMin < deltaToMax ? minAngle : maxAngle;
  }

  // 2. Apply stub vector with enforced angle
  const stubX = targetX + Math.cos(angle) * stubLength;
  const stubY = targetY + Math.sin(angle) * stubLength;

  // 3. Compute control points from source to stub start
  const [sourceControlX, sourceControlY] = getControlWithCurvature({
    pos: sourcePosition,
    x1: sourceX,
    y1: sourceY,
    x2: stubX,
    y2: stubY,
    c: curvature,
  });

  const exitDx = targetX - stubX;
  const exitDy = targetY - stubY;
  const exitLen = Math.hypot(exitDx, exitDy) || 1;
  const exitUx = exitDx / exitLen;
  const exitUy = exitDy / exitLen;

  // 2) choose how “far” the control stretches toward the target;
  const ctrlDist = stubLength * -5;

  // 3) place the control point **ahead** of the stub along that direction
  const stubControlX = stubX + exitUx * ctrlDist;
  const stubControlY = stubY + exitUy * ctrlDist;
  // 4. Create SVG path
  const path = [
    `M${sourceX},${sourceY}`,
    `C${sourceControlX.toFixed(3)},${sourceControlY.toFixed(3)}`,
    `${stubControlX.toFixed(3)},${stubControlY.toFixed(3)}`,
    `${stubX.toFixed(3)},${stubY.toFixed(3)}`,
    `L${targetX},${targetY}`,
  ].join(" ");

  // 5. Label & offset (based on Bézier section, not stub)
  const [labelX, labelY, offsetX, offsetY] = getBezierEdgeCenter({
    sourceX,
    sourceY,
    targetX: stubX,
    targetY: stubY,
    sourceControlX,
    sourceControlY,
    targetControlX: stubControlX,
    targetControlY: stubControlY,
  });

  return [path, labelX, labelY, offsetX, offsetY];
}

export function getQuadraticPath({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  curvature,
}: GetBezierPathParams): [
  path: string,
  labelX: number,
  labelY: number,
  offsetX: number,
  offsetY: number,
] {
  return getBezierPathWithTargetStub({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature,
  });
}
