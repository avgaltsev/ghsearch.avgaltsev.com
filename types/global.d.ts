declare module "*.less" {
	const styles: {
		[name: string]: (...mods: string[]) => string;
	};

	export default styles;
}
