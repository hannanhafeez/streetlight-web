import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";

interface MapProps extends google.maps.MapOptions {
	style: { [key: string]: string };
	onClick ?: (e: google.maps.MapMouseEvent) => void;
	onIdle ?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({
	onClick,
	onIdle,
	children,
	style,
	...options
}) => {

	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();

	useEffect(() => {
		if (map) {
			["click", "idle"].forEach((eventName) =>
				google.maps.event.clearListeners(map, eventName)
			);

			if (onClick) {
				map.addListener("click", onClick);
			}

			if (onIdle) {
				map.addListener("idle", () => onIdle(map));
			}
		}
	}, [map, onClick, onIdle]);

	useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, {}));
		}
	}, [ref, map]);
	
	return (
	<div ref={ref} style={style}>
		{Children.map(children, (child) => {
			if (isValidElement(child)) {
				// set the map prop on the child component
				return cloneElement(child, { map });
			}
		})}
	</div>
	);
};

export default Map;