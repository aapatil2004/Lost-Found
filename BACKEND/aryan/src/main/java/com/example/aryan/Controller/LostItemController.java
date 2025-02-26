package com.example.aryan.Controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.aryan.Model.LostItem;
import com.example.aryan.Service.LostItemService;

@RestController
@RequestMapping("/api")
@CrossOrigin // Allow requests from frontend
public class LostItemController {

    @Autowired
    private LostItemService lostItemService;

    // Report a Lost Item (with Image Upload)
    @PostMapping("/lost-item")
    public ResponseEntity<?> reportLostItem(@RequestPart("lostItem") LostItem lostItem,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            if (imageFile != null) {
                lostItem.setImageName(imageFile.getOriginalFilename());
                lostItem.setImageType(imageFile.getContentType());
                lostItem.setImage(imageFile.getBytes());
            }
            LostItem savedItem = lostItemService.reportLostItem(lostItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error reporting lost item: " + e.getMessage());
        }
    }

    // Get All Lost Items
    @GetMapping("/all")
    public ResponseEntity<List<LostItem>> getAllLostItems() {
        return ResponseEntity.ok(lostItemService.getAllLostItems());
    }

    // Get Lost Item by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getLostItemById(@PathVariable Integer id) {
        Optional<LostItem> lostItem = lostItemService.getLostItemById(id);
        return lostItem.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete Lost Item
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLostItem(@PathVariable Integer id) {
        lostItemService.deleteLostItem(id);
        return ResponseEntity.ok("Lost item deleted successfully.");
    }
}
