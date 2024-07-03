import type Server from '../interfaces/Server'
import fs from 'fs'
import path from 'path'

type GetFilesProps = {
	dirPath: string
	extension: string | string[]
	excludeIfStartsWith?: string
}

export function getFiles(props: GetFilesProps): string[] {
	try {
		fs.accessSync(props.dirPath)
	} catch (err) {
		return []
	}
	const files = fs.readdirSync(props.dirPath)
	const fileLocations: string[] = []

	files.forEach((file: any) => {
		if (
			props.excludeIfStartsWith &&
			file.startsWith(props.excludeIfStartsWith)
		) {
			return
		}

		// check if the files is a directory, and then loop though it
		if (fs.statSync(`${props.dirPath}/${file}`).isDirectory()) {
			fileLocations.push(
				...getFiles({
					...props,
					dirPath: `${props.dirPath}/${file}`,
					extension: props.extension,
				})
			)
		} else if (
			(props.extension != null &&
				Array.isArray(props.extension) &&
				(props.extension.includes(path.extname(file)) ||
					props.extension.filter((el) => {
						return /^\s*$/.test(String(el)) == false
					}).length == 0)) ||
			path.extname(file) == props.extension ||
			props.extension == null ||
			/^\s*$/.test(String(props.extension))
		) {
			fileLocations.push(`${props.dirPath}/${file}`)
		}
	})
	return fileLocations
}

export function loadFile<Type>(_path: string, server: Server): Type {
	return require(path.resolve(_path))(server)
}

export function getRouteName(_path: string | string[]): string {
	const pathArr = (_path = Array.isArray(_path) ? _path : _path.split('/'))
	var baseName = '/'

	for (let i = 0; i < pathArr.length; i++) {
		pathArr[i] = pathArr[i].replace(/\.ts|\.js/g, '')
	}

	for (let j = 1; j < pathArr.length; j++) {
		if (pathArr[j + 1] == 'index') baseName += `${pathArr[j]}/`
		else if (j > 1 && j != pathArr.length - 1) baseName += `${pathArr[j]}/`
		else if (pathArr.length - 2 == j) baseName += `${pathArr[j]}/`
		else if (pathArr[j] != 'index') baseName += `${`${pathArr[j]}`}/`
	}
	baseName = baseName.replace(/\[([^\]]+)\]/g, ':$1')

	return baseName
}
