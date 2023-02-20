import React, { useState, useEffect } from 'react'
import {
	fetchJson,
} from '@avante/crawler-api'

//-------------------------------
// Generic json Fetch
//
export const useFetch = (url, params = {}, options = {}) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		async function _fetch() {
			const results = await fetchJson(url, options.method ?? 'GET', params, options);
			if (results.error) {
				console.error(`useFetch(${url}) error:`, results.error);
				setError(results.error);
			} else {
				// console.log(`Fetched:`, results)
				setData(results);
			}
			setIsFetching(false);
		}
		if (url) {
			setData(null);
			setError(null);
			setIsFetching(true);
			_fetch();
		}
	}, [url, params]);

	return { data, error, isFetching };
};


//-------------------------------
// Fetch from api route
// /api/route/params.../
//
export const useApi = (route, args = [], params = {}) => {
	const [url, setUrl] = useState(null);

	useEffect(() => {
		if (!args.includes(null) && !args.includes(undefined)) {
			let newUrl = route;
			args.forEach((p) => {
				newUrl += '/' + p;
			});
			setUrl(newUrl);
		} else {
			setUrl(null);
		}
	}, [route, args]);

	return useFetch(url, params);
};


