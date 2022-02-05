import React, {useRef, useState, useLayoutEffect} from 'react';
import { useTheme } from "@material-ui/core";
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Stage, Layer, Line, Arrow, Circle } from 'react-konva';

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
	// const [voltagePhasorPos, setVoltagePhasorPos] = useState([stageWidth/2, stageHeight/2]);

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
						{/* 発電機電流 */}
						<Arrow
							x={0}
							y={stageHeight/2}
							points={[0, 0, stageWidth/3, 0]}
							fill="black"
							stroke="black"
							strokeWidth={2}
						/>
						{/* 需要家受電端電圧 */}
						<Arrow
							x={0}
							y={stageHeight/2}
							points={[0, 0, stageWidth/2, 0]}
							fill="black"
							stroke="black"
							strokeWidth={2}
						/>
						{/* 発電機電圧 */}
						<Arrow
							x={0}
							y={stageHeight/2}
							points={[0, 0, 100, 0]}
							fill={theme.palette.primary.main}
							stroke={theme.palette.primary.main}
							strokeWidth={2}
						/>
						{/* 発電機電圧をつかんで動かすための持ち手 */}
						{/* <Circle
							x={voltagePhasorPos[0]}
							y={voltagePhasorPos[1]}
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
								if (y < - stageHeight / 2) { y = - stageHeight / 2;}
								if (y > stageHeight / 2) { y = stageHeight / 2;}
								setVoltagePhasorPos([x, y]);
							}}
							onDragEnd={() => {
								setIsDragging(false);
							}}
						/> */}
					</Layer>
				</Stage>
			</Container>
		</React.Fragment>
	);
}