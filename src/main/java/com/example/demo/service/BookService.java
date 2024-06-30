package com.example.demo.service;

import com.example.demo.model.BookEntity;
import com.example.demo.repository.BookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BookService {
    @Autowired
    private BookRepository repository;

    public String testService() {
        BookEntity entity = BookEntity.builder().title("My first book item").build(); // BookEntity 생성
        repository.save(entity); // BookEntity 저장
        BookEntity savedEntity = repository.findById(entity.getId()).get(); // BookEntity 검색

        return savedEntity.getTitle();
    }

    // book 아이템 생성
    public List<BookEntity> create(final BookEntity entity) {
        validate(entity);

        repository.save(entity);
        log.info("Entity Id: {} saved.", entity.getId());

        return retrieveAll(entity.getUserId());
    }

    // book 아이템 검색
    public List<BookEntity> retrieve(final String title) {
        return repository.findByTitle(title);
    }

    public List<BookEntity> retrieveAll(final String userId) {
        return repository.findByUserId(userId);
    }

    // book 아이템 수정
    public List<BookEntity> update(final BookEntity entity) {
        validate(entity);

        final Optional<BookEntity> original = repository.findById(entity.getId()); // id로 제품 찾기

        original.ifPresent( book -> {
            book.setTitle(entity.getTitle());
            book.setPublisher(entity.getPublisher());
            book.setAuthor(entity.getAuthor());
            book.setUserId(entity.getUserId());
            repository.save(book);
        });

        return retrieveAll(entity.getUserId());
    }

    // book 아이템 삭제
    public List<BookEntity> delete(final BookEntity entity) {
        validate(entity);

        try {
            repository.delete(entity); // 엔티티 삭제
        }
        catch (Exception e) {
            log.error("error deleting entity", entity.getId(), e);
            throw new RuntimeException("error deleting entity" + entity.getId());
        }

        return retrieveAll(entity.getUserId());
    }

    // book 아이템 검증
    private void validate(final BookEntity entity) {
        if (entity == null) {
            log.warn("Entity cannot be null.");
            throw new RuntimeException("Entity cannot be null.");
        }
        if (entity.getUserId() == null) {
            log.info("Unknown user.");
            throw new RuntimeException("Unknown user.");
        }
    }
}
