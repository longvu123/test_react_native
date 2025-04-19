import axios from "axios";
// Mục đích:
// - Tạo một instance axios với baseURL được cấu hình sẵn
// - Mục đích là để khi cần gọi API từ nhiều server khác nhau
// - Chỉ cần thay đổi baseURL mà không cần sửa code ở các file khác

const instanceAxios = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL
});
export default instanceAxios;


// API thứ hai
// export const secondApi = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_SECOND_API_URL
// });

// Interceptor cho REQUEST - Được gọi trước khi request được gửi đi
instanceAxios.interceptors.request.use(
	function (config) {
		// Tại đây bạn có thể:
		// - Thêm headers (ví dụ: token xác thực)
		// - Thay đổi config của request
		// - Log request để debug
		// - Hiển thị loading spinner
		return config;
	},
	function (error) {
		// Xử lý lỗi nếu request bị fail
		// Ví dụ: không có kết nối mạng, URL không hợp lệ
		return Promise.reject(error);
	}
);

// Interceptor cho RESPONSE - Được gọi sau khi nhận response từ server
instanceAxios.interceptors.response.use(
	function (response) {
		// Xử lý dữ liệu trả về khi request thành công (status 2xx)
		// Ví dụ:
		// - Format lại dữ liệu
		// - Ẩn loading spinner
		// - Xử lý logic chung cho tất cả response
		
		if (response?.data) return response?.data;
		return response;
	},
	function (error) {
		// Xử lý các lỗi response (status không phải 2xx)
		// Ví dụ:
		// - Xử lý token hết hạn
		// - Xử lý lỗi 404, 500,...
		// - Hiển thị thông báo lỗi

		if (error?.response?.data) return error?.response?.data;
		return Promise.reject(error);
	}
);