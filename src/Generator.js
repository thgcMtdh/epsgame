import React, {useRef, useState, useLayoutEffect} from 'react';
import { useTheme } from "@material-ui/core";
import { Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

export default function Generator(props) {
	const theme = useTheme();

	const containerRef = useRef(null);  // ContainerのDOM要素を参照する Ref
	const [stageWidth, setStageWidth] = useState(0);  // Stageの幅をContainerの幅に合わせて変更する
	useLayoutEffect(() => {
		function updateSize() {
			setStageWidth(containerRef.current.clientWidth);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

  return (
		<React.Fragment>
			<Typography component="h2" variant="h6" color="primary">発電機コントロール</Typography>
			<Container ref={containerRef} maxWidth="lg" sx={{p: 0}}>
				<Stage width={stageWidth - 8} height={200}>
					<Layer>
					</Layer>
				</Stage>
			</Container>
		</React.Fragment>
	);
}