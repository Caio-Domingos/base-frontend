/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

// Define a interface para o objeto de diferenças
interface Difference {
	value1: any;
	value2: any;
}

// Define a interface para o objeto de mudanças
type Changes = Record<string, Difference>;

export const UtilsHandler = {
	/**
	 * Função que obtém as diferenças profundas entre dois objetos.
	 * @param obj1 - Primeiro objeto para comparar
	 * @param obj2 - Segundo objeto para comparar
	 * @returns Um objeto contendo as diferenças entre os dois objetos
	 */
	getDeepDifferences(obj1: Record<string, any>, obj2: Record<string, any>): Changes {
		const changes: Changes = {};

		/**
		 * Função recursiva para comparar dois objetos.
		 * @param o1 - Primeiro objeto para comparar
		 * @param o2 - Segundo objeto para comparar
		 * @param basePath - Caminho base para rastrear a profundidade da comparação
		 */
		function compareObjects(o1: Record<string, any>, o2: Record<string, any>, basePath: string): void {
			// União de todas as chaves presentes em ambos os objetos
			const allKeys = _.union(_.keys(o1), _.keys(o2));

			for (const key of allKeys) {
				// Criação do caminho completo para a chave atual
				const path = basePath ? `${basePath}.${key}` : key;

				// Se ambas as chaves são objetos, realiza a comparação recursiva
				if (_.isObject(o1[key]) && _.isObject(o2[key])) {
					compareObjects(o1[key], o2[key], path);
				}
				// Se os valores não são iguais, armazena a diferença
				else if (!_.isEqual(o1[key], o2[key])) {
					changes[path] = { value1: o1[key], value2: o2[key] };
				}
			}
		}

		// Inicia a comparação com os objetos fornecidos
		compareObjects(obj1, obj2, '');

		return changes;
	},

	async promiseTimer(timer?: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, timer ?? 3000);
		});
	},
};
