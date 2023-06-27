import axios from "axios";
import Nullable from "../../types/Nullable";
import Score, { CreateScoreParams, EditScoreParams } from "../../types/Score";

type TokenResolver = () => Nullable<string>;

interface Options {
	baseURL: string
	tokenResolver: TokenResolver
}

export interface BaseRequestOptions {
	abort?: AbortController
}

interface AuthRequestOptions extends BaseRequestOptions {
	uid: string
	password: string
}

class API {
	baseURL: string;
	axiosInstance: axios.AxiosInstance;
	tokenResolver: TokenResolver;

	constructor(options: Options) {
		this.baseURL = options.baseURL;
		this.tokenResolver = options.tokenResolver;

		this.axiosInstance = axios.create({
			baseURL: this.baseURL,
		});
	}

	private async request(options: axios.AxiosRequestConfig<any>, sendToken: boolean) {
		if (sendToken) {
			const token = this.tokenResolver();

			if (token){
				// eslint-disable-next-line no-param-reassign
				options = {
					...options,
					headers: {
						...options.headers,
						"Authorization": `Bearer ${token}`,
					}
				};
			}
		}

		return this.axiosInstance(options)
			.then(response => ({
				success: true as const,
				canceled: false as const,
				response,
				error: undefined,
			}))
			.catch((error: axios.AxiosError) => {
				if (error.code === `ERR_CANCELED`)
					return {
						success: false as const,
						canceled: true as const,
						response: undefined,
						error: undefined,
					};

				console.log(`[API] Request Failed: ${options.method?.toUpperCase()} ${options.url} - ${error.message}`);
				console.error(error);

				return {
					success: false as const,
					canceled: false as const,
					response: undefined,
					error,
				};
			});
	}

	async auth({
		uid,
		password,
		abort,
	}: AuthRequestOptions) {
		return await this.request({
			method: 'post',
			url: '/api/v1/auth/login',
			params: {
				uid,
				password,
			},
			signal: abort?.signal,
		}, false);
	}

	async logout(options: BaseRequestOptions) {
		return await this.request({
			method: 'post',
			url: '/api/v1/auth/logout',
			signal: options?.abort?.signal,
		}, true);
	}

	async getUser(options: BaseRequestOptions) {
		return await this.request({
			method: 'get',
			url: '/api/v1/user/info',
			signal: options?.abort?.signal,
		}, true);
	}

	async getOwnScores(options: BaseRequestOptions) {
		return await this.request({
			method: 'get',
			url: '/api/v1/scores/get-own',
			signal: options?.abort?.signal,
		}, true);
	}

	async getScores(options: { studentId: number } & BaseRequestOptions) {
		return await this.request({
			method: 'get',
			url: '/api/v1/scores/get',
			params: {
				studentId: options.studentId,
			},
			signal: options.abort?.signal,
		}, true);
	}

	async createScore(options: {
		score: Pick<Score, CreateScoreParams>
	} & BaseRequestOptions) {
		return await this.request({
			method: 'post',
			url: '/api/v1/scores/create',
			params: {
				...options.score,
			},
			signal: options.abort?.signal,
		}, true);
	}

	async updateScore(options: {
		score: Pick<Score, EditScoreParams>
	} & BaseRequestOptions) {
		return await this.request({
			method: 'post',
			url: '/api/v1/scores/update',
			params: {
				...options.score,
			},
			signal: options.abort?.signal,
		}, true);
	}

	async deleteScore(options: {
		score: Pick<Score, "id">
	} & BaseRequestOptions) {
		return await this.request({
			method: 'delete',
			url: '/api/v1/scores/delete',
			params: {
				...options.score,
			},
			signal: options.abort?.signal,
		}, true);
	}

	async getSemesters(options: BaseRequestOptions) {
		return await this.request({
			method: 'get',
			url: '/api/v1/semesters/list',
			signal: options.abort?.signal,
		}, true);
	}

	async createSemester(options: {
		number: number
		year: number
	} & BaseRequestOptions) {
		return await this.request({
			method: 'post',
			url: '/api/v1/semesters/add',
			params: {
				number: options.number,
				year: options.year,
			},
			signal: options.abort?.signal,
		}, true);
	}

	async getStudents(options: BaseRequestOptions) {
		return await this.request({
			method: 'get',
			url: '/api/v1/students/list',
			signal: options.abort?.signal,
		}, true);
	}
}

export default API;