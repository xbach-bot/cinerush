package com.cinerush.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION("UNCATEGORIZED", "Lỗi không xác định hệ thống", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY("INVALID_KEY", "Mã lỗi không hợp lệ", HttpStatus.BAD_REQUEST),
    USER_EXISTED("USER_EXISTED", "Người dùng đã tồn tại", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND("USER_NOT_FOUND", "Không tìm thấy người dùng", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED("UNAUTHENTICATED", "Chưa xác thực tài khoản", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED("UNAUTHORIZED", "Không có quyền truy cập", HttpStatus.FORBIDDEN),
    INVALID_INPUT("INVALID_INPUT", "Dữ liệu đầu vào không hợp lệ", HttpStatus.BAD_REQUEST);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(String code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
