package com.example.aryan.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.aryan.Model.FoundItem;

@Repository
public interface FoundItemRepository extends JpaRepository<FoundItem, Integer> {
}
