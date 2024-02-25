export interface Pagination<T> {
    data: Array<T>,
    meta: {
        total: '',
        perPage: '',
        currentPage: '',
        lastPage: '',
        firstPage: '',
        firstPageUrl: '',
        lastPageUrl: '',
        nextPageUrl: '',
        previousPageUrl: null
    }
}