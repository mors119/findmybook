import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000, // 요청 제한 시간
  headers: { 'Content-Type': 'application/json' },
});
const fileClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000, // 요청 제한 시간
  headers: { 'Content-Type': 'multipart/form-data' },
});

// API 요청 함수
export const findEmail = async (userName: string, birth: string) => {
  return apiClient.post('/user/findEmail', { userName, birth });
};

export const findPassword = async (email: string, userName: string) => {
  return apiClient.post('/user/findPassword', { email, userName });
};

export const checkEmail = async (email: string) => {
  return apiClient.get(`/user/checkEmail?email=${email}`);
};

export const signup = async (
  email: string,
  password: string,
  phone: string,
  username: string,
  birth: string,
  address: string,
  detailAddress: string,
) => {
  const user = {
    email: email,
    password: password,
    phone: phone,
    userName: username,
    birth: birth,
    address: address + detailAddress,
  };
  return apiClient.post('/user/signup', user);
};

export const sendEmail = async (email: string) => {
  return apiClient.get(`/user/sendEmail?email=${email}`);
};

export const checkPassCord = async (passCord: string, email: string) => {
  return apiClient.get(
    `/user/checkPassCord?passCord=${passCord}&email=${email}`,
  );
};

export const loginRequest = async (email: string, password: string) => {
  return apiClient.post('/user/login', { email, password });
};

export const addBook = async (formData: FormData) => {
  return apiClient.post('/book/addBook', formData);
};

export const addFile = async (formData: FormData) => {
  return fileClient.post('/book/upload', formData);
};

export const getBooks = async (
  token: string,
  page: number = 0,
  size: number = 10,
) => {
  return apiClient.get(
    `/book/getBooks?email=${token}&page=${page}&size=${size}`,
  );
};

export const deleteBook = async (bookNo: number) => {
  return apiClient.delete(`/book/deleteBook?bookNo=${bookNo}`);
};

export const getBook = async (bookNo: number) => {
  return apiClient.get(`/book/getBook?bookNo=${bookNo}`);
};

export const updateBook = async (formData: FormData) => {
  return apiClient.put(`/book/updateBook`, formData);
};

export const updateFile = async (bookNo: number, formData: FormData) => {
  return fileClient.put(`/book/updateFile?bookNo=${bookNo}`, formData);
};

export const deleteFile = async (image: string) => {
  return fileClient.delete(`/book/deleteFile/${image}`);
};

export const getMainBooks = async (size: number) => {
  return apiClient.get(`/book/getMainBooks?size=${size}`);
};

export const getSearchBooks = async (search: string) => {
  return apiClient.get(`/book/search?search=${search}`);
};

// 모든 책 번호만 가져오는 공개 API (정적 파라미터 생성)
export const getAllBookNos = async () => {
  const response = await apiClient.get('/book/getAllBookNos');
  return response;
};
