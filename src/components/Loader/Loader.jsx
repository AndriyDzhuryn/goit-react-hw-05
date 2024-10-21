import { Circles } from 'react-loader-spinner';

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <Circles
        height="80"
        width="80"
        color="#0000ff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
