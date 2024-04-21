package com.example.demo.controller;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.BookDTO;
import com.example.demo.model.BookEntity;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService service; // 서비스 객체 생성

    @GetMapping("/test")
    public ResponseEntity<?> testBook() {
        String str = service.testService(); // BookService 테스트 서비스 사용 -> 문자열 반환
        List<String> list = new ArrayList<>();
        list.add(str);
        ResponseDTO<String> response = ResponseDTO.<String>builder().data(list).build();

        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> createBook(@RequestBody BookDTO dto) {
        try {
            String temporaryUserId = "KaYeonSeon";
            BookEntity entity = BookDTO.toEntity(dto); // dto -> entity 변환
            entity.setId(null); // Id, UserId 초기화
            entity.setUserId(temporaryUserId);

            List<BookEntity> entities = service.create(entity); // 서비스를 이용해 todo 엔티티 생성

            List<BookDTO> dtos = entities.stream().map(BookDTO::new).collect(Collectors.toList()); // entity 리스트 -> dto 리스트 변환
            ResponseDTO<BookDTO> response = ResponseDTO.<BookDTO>builder().data(dtos).build(); // dto 리스트로 ResponseDTO 초기화

            return ResponseEntity.ok().body(response); // ResponseDTO와 상태 리턴
        }
        catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<BookDTO> response = ResponseDTO.<BookDTO>builder().error(error).build();

            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> retrieveBookList(@RequestBody BookDTO dto) {
        String temporaryUserId = "KaYeonSeon"; // 임시 유저 아이디
        BookEntity entity = BookDTO.toEntity(dto);
        entity.setUserId(temporaryUserId);

        List<BookEntity> entities = service.retrieve(entity); // 서비스를 이용해 todo 엔티티 검색

        List<BookDTO> dtos = entities.stream().map(BookDTO::new).collect(Collectors.toList()); // entity 리스트 -> dto 리스트 변환

        ResponseDTO<BookDTO> response = ResponseDTO.<BookDTO>builder().data(dtos).build(); // dto 리스트로 ResponseDTO 초기화

        return ResponseEntity.ok().body(response);
    }

    @PutMapping
    public ResponseEntity<?> updateBook(@RequestBody BookDTO dto) {
        String temporaryUserId = "KaYeonSeon"; // 임시 유저 아이디
        BookEntity entity = BookDTO.toEntity(dto);
        entity.setUserId(temporaryUserId);

        List<BookEntity> entities = service.update(entity); // 서비스를 이용해 todo 엔티티 수정

        List<BookDTO> dtos = entities.stream().map(BookDTO::new).collect(Collectors.toList()); // entity 리스트 -> dto 리스트 변환
        ResponseDTO<BookDTO> response = ResponseDTO.<BookDTO>builder().data(dtos).build(); // dto 리스트로 ResponseDTO 초기화

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteBook(@RequestBody BookDTO dto) {
        try {
            String temporaryUserId = "KaYeonSeon";
            BookEntity entity = BookDTO.toEntity(dto); // dto -> entity 변환
            entity.setUserId(temporaryUserId);

            List<BookEntity> entities = service.delete(entity); // 서비스를 이용해 todo 엔티티 삭제

            List<BookDTO> dtos = entities.stream().map(BookDTO::new).collect(Collectors.toList()); // entity 리스트 -> dto 리스트 변환
            ResponseDTO<BookDTO> response = ResponseDTO.<BookDTO>builder().data(dtos).build(); // dto 리스트로 ResponseDTO 초기화

            return ResponseEntity.ok().body(response);
        }
        catch (Exception e) {
            String error = e.getMessage();
            ResponseDTO<BookDTO> response = ResponseDTO.<BookDTO>builder().error(error).build();

            return ResponseEntity.badRequest().body(response);
        }
    }
}
