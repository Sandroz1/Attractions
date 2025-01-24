import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Pagination from "../../components/Pagination/Pagination";
import SearchAndFilters from "../../components/SearchAndFilters/SearchAndFilters";
import { fetchData } from "../../api";
import "./AttractionsPage.scss";

const AttractionsPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [totalPages] = useState(3);

  const getAttractions = async ({ queryKey }) => {
    const [, { page, filter, search, sort }] = queryKey;
    let url = `https://672885dc270bd0b97555ee35.mockapi.io/repos?page=${page}&limit=12`;

    if (filter !== "all") {
      url += `&category=${filter}`;
    }
    if (search) {
      url += `&name=${search}`;
    }
    if (sort) {
      const order = sort === "popularity" ? "desc" : "asc";
      url += `&sortBy=${sort}&order=${order}`;
    }

    return await fetchData(url);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["attractions", { page, filter, search, sort }],
    queryFn: getAttractions,
    keepPreviousData: true,
  });

  const reset = () => {
    setFilter("all");
    setSearch("");
    setSort("");
    setPage(1);
  };

  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="attractions-page">
      <h1 className="attractions-page__title">Достопримечательности</h1>
      <div className="attractions-page__container">
        <SearchAndFilters
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          onReset={reset}
        />

        <div className="attractions-page__content">
          <div className="attractions-page__content__container">
            {isLoading ? (
              <div className="attractions-page__loader-container">
                <Loader />
              </div>
            ) : (
              data?.map((item) => (
                <Link
                  key={item.id}
                  to={`/attractions/${item.id}`}
                  className="attractions-page__card"
                >
                  <div className="attractions-page__card__image-container">
                    <img
                      src={`/assets/image/doscard/${item.img1}.svg`}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = "/assets/image/placeholder.svg";
                      }}
                    />
                  </div>
                  <h3 className="attractions-page__card__text">{item.name}</h3>
                  <p className="attractions-page__card__description">
                    {item.discriprion && item.discriprion.length < 20
                      ? item.discriprion
                      : item.discriprion
                      ? "Описание слишком длинное"
                      : "Описание отсутствует"}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          hasNextPage={page < totalPages}
          hasPrevPage={page > 1}
        />
      </div>
    </div>
  );
};

export default AttractionsPage;
