
import typescript from 'rollup-plugin-typescript2';
import  { uglify }  from  'rollup-plugin-uglify';

//import sourceMaps from "rollup-plugin-sourcemaps";

export default {
	input: 'src/main.ts',
	output: {
		file: 'dist/huayou.min.js',
		//file: 'dist/huayou.esm.min.js',
		name: 'Huayou',
		format: 'umd',
		//format: 'esm',
		sourcemap: true,
	},
	////plugins: [resolve(),commonjs()],
	plugins: [
		typescript({
		  useTsconfigDeclarationDir: true,
		  //abortOnError: false,
		  //removeComments: false,
		 //sourceMap:true,
		}),
		/**/
		uglify({
			compress:  true
		}),
		//sourceMaps(),
	],
}
