package com.example.aryan.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.aryan.Model.LostItem;

@Repository
public interface LostItemRepository extends JpaRepository<LostItem, Integer> {
}
