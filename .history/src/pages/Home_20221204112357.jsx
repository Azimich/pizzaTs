// ИЗ БИБЛИОТЕКИ
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
// ИЗ КОМПОНЕНТОВ
import '../scss/app.scss';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/pizzaBlock/Skeleton';
import PizzaBlock from "../components/pizzaBlock";
import Categories from '../components/Categories';
import Pagination from '../components/pagination/Pagination';
import { SearchContext } from '../App';
// ИЗ REDUX
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/fiterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  const {searchValue} = React.useContext(SearchContext);
  // const [isLoading, setIsLoading] = React.useState(true);

  //ИЗМЕНЕНИЯ КАТЕГОРИЙ 
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  //Вызов пагинации из редакса 
  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    )

    window.scrollTo(0, 0);
  }

  //useEffect чтобы влиять на ссылки
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
  
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate] ); 

  //Оснавной useEffect который проверяет ссылки после первого редера и сохраняет в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      
      dispatch (
        setFilters({
          ...params,
          sort,
        })
      )

      isSearch.current = true;
    }
  }, [dispatch]);

  // useEffec Если был первый рендер, тогда запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
  const skeletons = [...new Array(20)].map((_, index) => <Skeleton key={index}/>)

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      { status === 'error' ? (
        <div className='error_404'>
          <svg width="784" height="480" viewBox="0 0 784 480" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.428 429.708H37.3007C36.9933 428.171 36.4372 426.751 35.6322 425.449C34.8418 424.132 33.8466 422.983 32.6464 422.002C31.4463 421.021 30.0851 420.26 28.563 419.719C27.0409 419.177 25.3943 418.907 23.6234 418.907C20.784 418.907 18.1934 419.646 15.8516 421.124C13.5245 422.602 11.6584 424.776 10.2534 427.644C8.86295 430.498 8.16774 433.996 8.16774 438.138C8.16774 442.31 8.86295 445.822 10.2534 448.676C11.6584 451.53 13.5245 453.696 15.8516 455.175C18.1934 456.638 20.784 457.37 23.6234 457.37C25.3943 457.37 27.0409 457.099 28.563 456.558C30.0851 456.016 31.4463 455.262 32.6464 454.296C33.8466 453.316 34.8418 452.167 35.6322 450.85C36.4372 449.532 36.9933 448.105 37.3007 446.569H41.428C41.0622 448.632 40.3743 450.557 39.3644 452.342C38.3691 454.113 37.0958 455.665 35.5444 456.997C34.0076 458.329 32.2366 459.368 30.2315 460.114C28.2264 460.861 26.0237 461.234 23.6234 461.234C19.8473 461.234 16.4956 460.29 13.5684 458.402C10.6412 456.499 8.34337 453.821 6.67486 450.367C5.02099 446.913 4.19406 442.836 4.19406 438.138C4.19406 433.44 5.02099 429.364 6.67486 425.91C8.34337 422.456 10.6412 419.785 13.5684 417.897C16.4956 415.994 19.8473 415.043 23.6234 415.043C26.0237 415.043 28.2264 415.416 30.2315 416.162C32.2366 416.894 34.0076 417.933 35.5444 419.28C37.0958 420.612 38.3691 422.163 39.3644 423.934C40.3743 425.705 41.0622 427.63 41.428 429.708ZM49.8946 419.346V415.657H82.4963V419.346H68.2482V460.619H64.1428V419.346H49.8946ZM93.2845 460.619V415.657H107.796C110.987 415.657 113.65 416.272 115.787 417.501C117.939 418.716 119.556 420.37 120.639 422.463C121.737 424.556 122.286 426.912 122.286 429.532C122.286 432.152 121.744 434.516 120.661 436.623C119.578 438.716 117.968 440.378 115.831 441.607C113.694 442.822 111.038 443.429 107.862 443.429H96.4459V439.741H107.752C110.109 439.741 112.062 439.302 113.614 438.424C115.165 437.531 116.322 436.316 117.083 434.779C117.858 433.242 118.246 431.493 118.246 429.532C118.246 427.571 117.858 425.822 117.083 424.285C116.322 422.748 115.158 421.541 113.592 420.663C112.041 419.785 110.072 419.346 107.686 419.346H97.3899V460.619H93.2845ZM128.947 460.619H124.644L140.999 415.657H145.39L161.746 460.619H157.443L143.348 420.992H143.041L128.947 460.619ZM132.042 443.385H154.347V447.074H132.042V443.385ZM170.997 460.619V415.657H175.103V436.272H200.613V415.657H204.719V460.619H200.613V439.96H175.103V460.619H170.997ZM218.185 415.657H222.225V453.352H222.576L249.206 415.657H253.202V460.619H249.096V422.968H248.745L222.159 460.619H218.185V415.657ZM302.947 456.689L302.355 471.245H298.315V460.619H294.912V456.689H302.947ZM266.701 460.619V415.657H270.631V456.821H295.132V415.657H299.04V460.619H266.701ZM313.412 460.619H309.109L325.465 415.657H329.855L346.211 460.619H341.908L327.814 420.992H327.506L313.412 460.619ZM316.507 443.385H338.813V447.074H316.507V443.385ZM374.396 460.619V415.657H378.501V436.272H404.012V415.657H408.117V460.619H404.012V439.96H378.501V460.619H374.396ZM421.584 460.619V415.657H447.665V419.346H425.689V436.272H446.282V439.96H425.689V456.931H448.104V460.619H421.584ZM478.769 460.619V415.657H482.875V436.272H508.385V415.657H512.491V460.619H508.385V439.96H482.875V460.619H478.769ZM526.023 460.619H521.72L538.076 415.657H542.467L558.822 460.619H554.519L540.425 420.992H540.118L526.023 460.619ZM529.119 443.385H551.424V447.074H529.119V443.385ZM568.074 415.657H572.113V453.352H572.465L599.095 415.657H603.09V460.619H598.985V422.968H598.634L572.047 460.619H568.074V415.657ZM589.611 404.417H593.299C593.299 406.51 592.604 408.208 591.213 409.51C589.838 410.813 587.957 411.464 585.571 411.464C583.215 411.464 581.349 410.813 579.973 409.51C578.597 408.208 577.909 406.51 577.909 404.417H581.597C581.597 405.559 581.905 406.524 582.52 407.315C583.149 408.091 584.166 408.478 585.571 408.478C586.976 408.478 588.001 408.091 588.645 407.315C589.289 406.524 589.611 405.559 589.611 404.417ZM612.353 471.53V456.931H615.207C616.246 455.848 617.205 454.421 618.083 452.65C618.961 450.864 619.693 448.566 620.278 445.756C620.878 442.932 621.266 439.404 621.442 435.174L622.342 415.657H648.05V456.931H653.319V471.421H649.411V460.619H616.261V471.53H612.353ZM620.125 456.931H644.142V419.346H626.074L625.372 435.174C625.211 438.614 624.911 441.68 624.472 444.373C624.032 447.052 623.447 449.43 622.715 451.508C621.998 453.572 621.134 455.379 620.125 456.931ZM663.718 460.619V415.657H689.799V419.346H667.823V436.272H688.416V439.96H667.823V456.931H690.238V460.619H663.718ZM701.97 460.619V415.657H706.076V436.272H731.586V415.657H735.691V460.619H731.586V439.96H706.076V460.619H701.97ZM749.224 460.619H744.921L761.277 415.657H765.668L782.023 460.619H777.72L763.626 420.992H763.318L749.224 460.619ZM752.32 443.385H774.625V447.074H752.32V443.385Z" fill="#FE5F1E"/>
            <path d="M120.85 261.427V228.487L203.441 98.3703H231.841V143.964H215.033L162.967 226.362V227.908H280.333V261.427H120.85ZM215.806 296.202V251.381L216.578 236.795V98.3703H255.797V296.202H215.806ZM392.57 300.549C375.955 300.485 361.658 296.395 349.68 288.281C337.767 280.167 328.59 268.414 322.15 253.023C315.775 237.632 312.619 219.117 312.683 197.479C312.683 175.906 315.871 157.52 322.247 142.322C328.686 127.124 337.863 115.565 349.777 107.644C361.755 99.6583 376.019 95.6656 392.57 95.6656C409.12 95.6656 423.352 99.6583 435.266 107.644C447.244 115.629 456.453 127.221 462.893 142.419C469.332 157.552 472.52 175.906 472.456 197.479C472.456 219.182 469.236 237.728 462.796 253.12C456.421 268.511 447.276 280.264 435.362 288.378C423.449 296.492 409.184 300.549 392.57 300.549ZM392.57 265.871C403.904 265.871 412.952 260.171 419.714 248.773C426.475 237.374 429.824 220.276 429.76 197.479C429.76 182.475 428.214 169.981 425.123 160C422.096 150.018 417.782 142.515 412.179 137.492C406.641 132.469 400.104 129.958 392.57 129.958C381.3 129.958 372.284 135.593 365.522 146.862C358.76 158.132 355.347 175.004 355.283 197.479C355.283 212.677 356.796 225.364 359.823 235.539C362.914 245.649 367.261 253.248 372.864 258.336C378.466 263.359 385.035 265.871 392.57 265.871ZM506.086 261.427V228.487L588.677 98.3703H617.077V143.964H600.269L548.203 226.362V227.908H665.569V261.427H506.086ZM601.042 296.202V251.381L601.814 236.795V98.3703H641.033V296.202H601.042Z" fill="#FE5F1E"/>
            <path d="M25.7886 362.507L760.239 362.507" stroke="#FE5F1E" stroke-width="2.4729" stroke-miterlimit="10"/>
          </svg>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </>
  )
}

export default Home;
