import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/huayou.min.js',
		//file: 'dist/huayou.esm.min.js',
		name: 'Huayou',
		format: 'umd',
		//format: 'esm',
		sourcemap: true,
	},
	plugins: [
		typescript({
			useTsconfigDeclarationDir: true,
			//abortOnError: false,
			//removeComments: false,
			//sourceMap:true,
		}),
		terser()
		//sourceMaps(),
	],
}
