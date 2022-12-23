type PagerProps = {
    itemsNumber: number,
    onPageCallback: (page: number) => void,
    currentPage?: number,
    itemsOnPage?: number,
    range?: number,
}
const Pager = ({itemsNumber, onPageCallback, currentPage = 1, itemsOnPage = 20, range = 6}: PagerProps) => {
    if (!itemsNumber || !itemsOnPage) {
        return <></>;
    }

    const maxPage = itemsNumber == 0 ? 1 : Math.ceil(itemsNumber / itemsOnPage);
    const prevPage = currentPage > 1 ? currentPage - 1 : 0;
    const nextPage = currentPage < maxPage ? currentPage + 1 : 0;

    const firstPage = Math.max(1, currentPage - Math.floor(range / 2));
    const lastPage = Math.min(maxPage, firstPage + range - 1);

    const pagesList = [];
    for (let i = firstPage; i <= lastPage; i++) {
        pagesList.push(i);
    }

    return (
        <div className="flex justify-center mt-4 mb-2">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    {prevPage > 0 && (<li className="page-item"><span
                        className="page-link cursor-pointer relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none"
                        onClick={() => onPageCallback(prevPage)}>Previous</span></li>)}
                    {pagesList.map((page) => (
                        <li className="page-item" key={`page-${page}`}><span
                            className={`${currentPage === page ? 'bg-gray-200 ' : ''}page-link cursor-pointer relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`}
                            onClick={() => onPageCallback(page)}>{page}</span></li>
                    ))}
                    {nextPage > 0 && (
                        <li className="page-item"><span
                            className="page-link cursor-pointer relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            onClick={() => onPageCallback(nextPage)}>Next</span></li>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Pager;