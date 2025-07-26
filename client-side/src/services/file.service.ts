import { axiosWithAuth } from '@/api/api.interceptors'
import { IFile } from '../shared/types/file.interface'
import { API_URL } from '@/config/api.constants'

class FileService {
	async uploadFile(file: FormData, folder?: string) {
		const { data } = await axiosWithAuth<IFile[]>({
			url: API_URL.files.upload(folder),
			method: 'POST',
			data: file,
			params: {
				folder,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		return data
	}
}

export const fileService = new FileService()
