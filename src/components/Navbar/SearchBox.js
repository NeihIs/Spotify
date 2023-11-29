import React, {
  useRef,
} from "react";

import Icon from "../UI/Icon";
import styles from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import { search, clearSearch } from "../../store/reducers/searchReducer";
//ngăn chặn một cách hiệu quả chức năng fn được gọi quá thường xuyên bằng cách lên lịch thời gian chờ và chỉ thực hiện chức năng sau khi hết thời gian chờ
function debounce(fn, time) {
  let timeoutId;
  return wrapper;
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
}

const SearchBox = () => {
  const dispatch = useDispatch();
  const inputRef = useRef("");

  const api = (val) => {
    dispatch(search({ searchText: val }));
  };
  //cung cấp sử dụng hàm debounce này để trì hoãn việc thực thi hàm api, đảm bảo rằng nó không được gọi nhiều lần sau mỗi lần nhấn phím hoặc thay đổi đầu vào
  //Hàm gọi lại này lấy chuỗi tìm kiếm ( string) làm đầu vào và thực hiện lệnh gọi API ,chuyển chuỗi tìm kiếm làm đối số
  const handleSearch = debounce((string) => api(string), 1000);
  //cập nhật truy vấn tìm kiếm bất cứ khi nào người dùng sửa đổi trường nhập
  const changeHandler = (e) => {
    handleSearch(e.target.value);
  };

  const resetHandler = () => {
    dispatch(clearSearch());
    //đặt giá trị của trường đầu vào thành một chuỗi trống, xóa đầu vào của người dùng khỏi thanh tìm kiếm
    inputRef.current.value = "";
  };

  return (
    <div className={styles.box}>
      <span>
        <Icon name="navbar-search" color="#000" width={24} height={24} />
      </span>
      <input
        className={styles.input}
        ref={inputRef}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="What do you want to listen to?"
        onChange={changeHandler}
      />
      <div onClick={resetHandler}>
        {inputRef.current.valueOf !== "" && (
          <Icon
            name="navbar-search-clear"
            color="#000"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBox;
