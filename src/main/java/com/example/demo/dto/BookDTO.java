package com.example.demo.dto;

import com.example.demo.model.BookEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookDTO {
    private String id;
    private String userId;
    private String title;
    private String author;
    private String publisher;

    public BookDTO(final BookEntity entity) {
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.title = entity.getTitle();
        this.author = entity.getAuthor();
        this.publisher = entity.getPublisher();
    }

    public static BookEntity toEntity(final BookDTO dto) {
        return BookEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .publisher(dto.getPublisher())
                .build();
    }
}