package com.example.aryan.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.aryan.Model.FoundItem;
import com.example.aryan.Repository.FoundItemRepository;

@Service
public class FoundItemService {

    @Autowired
    private FoundItemRepository foundItemRepository;

    public FoundItem reportFoundItem(FoundItem foundItem) {
        return foundItemRepository.save(foundItem);
    }

    public List<FoundItem> getAllFoundItems() {
        return foundItemRepository.findAll();
    }

    public FoundItem getFoundItemById(Integer id) {
        return foundItemRepository.findById(id).orElse(null);
    }

    public void deleteFoundItem(Integer id) {
        foundItemRepository.deleteById(id);
    }
}
 