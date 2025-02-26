package com.example.aryan.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.aryan.Model.LostItem;
import com.example.aryan.Repository.LostItemRepository;

@Service
public class LostItemService {

    @Autowired
    private LostItemRepository lostItemRepository;

    public LostItem reportLostItem(LostItem lostItem) {
        return lostItemRepository.save(lostItem);
    }

    public List<LostItem> getAllLostItems() {
        return lostItemRepository.findAll();
    }

    public Optional<LostItem> getLostItemById(Integer id) {
        return lostItemRepository.findById(id);
    }

    public void deleteLostItem(Integer id) {
        lostItemRepository.deleteById(id);
    }
}
