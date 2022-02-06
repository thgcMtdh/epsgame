import React, {useRef, useState, useLayoutEffect} from 'react';
import { useTheme } from "@material-ui/core";
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Stage, Layer, Line, Arrow, Circle } from 'react-konva';
import Complex from './Complex';

// 1puのフェーザが、描画領域の幅に対して何倍の大きさで映るか. 小さいほど広い範囲が映る
const zoom = 0.6

/**
 * Stageに描画する矢印の座標をフェーザから計算する
 * @param {Complex} phasor 複素フェーザ
 * @param {number} stageWidth 描画領域の幅
 * @param {Complex} start 矢印の始点を表す複素フェーザ. 与えられなかった場合は0から始まる
 */
function phasorToArrow(phasor, stageWidth, start={re:0, im:0}) {
	return [
		start.re * zoom * stageWidth,
		start.im * zoom * stageWidth,
		(phasor.re - start.re) * zoom * stageWidth,
		- (phasor.im - start.im) * zoom * stageWidth
	]
}

/**
 * フェーザをStage上に描画されている矢印の座標から計算する
 * @param {number[]} arrowPoints 矢印の座標. [始点x, 始点y, 終点x, 終点y]
 * @param {number} stageWidth 描画領域の幅
 * @return {[Complex, Complex]} フェーザ phasor と、始点 start をこの順に返す
 */
function arrowToPhasor(arrowPoints, stageWidth) {
	return [
		new Complex(
			(arrowPoints[2] - arrowPoints[0]) / zoom / stageWidth,
			- (arrowPoints[3] - arrowPoints[1]) / zoom / stageWidth
		),
		new Complex(
			arrowPoints[0] / zoom / stageWidth,
			- arrowPoints[1] / zoom / stageWidth
		)
	]
}

export default function Generator(props) {
	const theme = useTheme();

	const containerRef = useRef(null);  // ContainerのDOM要素を参照する Ref
	const [stageWidth, setStageWidth] = useState(0);  // Stageの幅をContainerの幅に合わせて変更する
	const stageHeight = 200;  // 描画領域の高さ
	useLayoutEffect(() => {
		function updateSize() {
			setStageWidth(containerRef.current.clientWidth - 48);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	const [isDragging, setIsDragging] = useState(false);  // 発電機電圧フェーザをドラッグ中にtrueになる

	const genVArrowPoints = phasorToArrow(props.genV, stageWidth);

  return (
		<React.Fragment>
			<Typography component="h2" variant="h6" color="primary">発電機コントロール</Typography>
			<Container ref={containerRef} maxWidth="lg" p={0}>
				<Stage width={stageWidth} height={stageHeight}>
					<Layer>
						{/* 座標軸. 需要家の受電端電圧を位相基準とする */}
						<Line
							x={0}
							y={stageHeight/2}
							points={[0, 0, stageWidth, 0]}
							fill="black"
							stroke="black"
							strokeWidth={1}
						/>
						<Line
							x={0}
							y={0}
							points={[0, 0, 0, stageHeight]}
							fill="black"
							stroke="black"
							strokeWidth={1}
						/>
						{/* 負荷電流 */}
						<Arrow
							x={0}
							y={stageHeight/2}
							points={phasorToArrow(Complex.csub(new Complex(0,0), props.demI), stageWidth)}
							fill="black"
							stroke="black"
							strokeWidth={2}
						/>
						{/* 需要家受電端電圧 */}
						<Arrow
							x={0}
							y={stageHeight/2}
							points={phasorToArrow(props.demV, stageWidth)}
							fill="black"
							stroke="black"
							strokeWidth={2}
						/>
						{/* 発電機電圧 */}
						<Arrow
							x={0}
							y={stageHeight/2}
							points={genVArrowPoints}
							fill={theme.palette.primary.main}
							stroke={theme.palette.primary.main}
							strokeWidth={2}
						/>
						{/* 発電機電圧をつかんで動かすための持ち手 */}
						<Circle
							x={genVArrowPoints[2]}
							y={genVArrowPoints[3] + stageHeight * 0.5}
							radius={isDragging ? 12 : 10}
							fill={isDragging ? "#888888" : "#999999"}
							opacity={0.5}
							draggable
							onDragStart={() => {
								setIsDragging(true);
							}}
							onDragMove={e => {
								let x = e.target.x();
								let y = e.target.y();
								if (x < 0) { x = 0; }
								if (x > stageWidth) { x = stageWidth; }
								if (y < 0) { y = 0;}
								if (y > stageHeight) { y = stageHeight;}
								props.onChange(arrowToPhasor([0, 0, x, y - stageHeight/2], stageWidth)[0]);
							}}
							onDragEnd={() => {
								setIsDragging(false);
							}}
						/>
					</Layer>
				</Stage>
			</Container>
		</React.Fragment>
	);
}