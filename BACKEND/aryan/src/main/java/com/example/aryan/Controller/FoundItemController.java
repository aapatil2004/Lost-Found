package com.example.aryan.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.aryan.Model.FoundItem;
import com.example.aryan.Service.FoundItemService;

@RestController
@RequestMapping("/api")
@CrossOrigin // Allow requests from frontend
public class FoundItemController {

    @Autowired
    private FoundItemService foundItemService;

    @RequestMapping("/founditems")
    public ResponseEntity<List<FoundItem>> getAllFoundItems() {
        return new ResponseEntity<>(foundItemService.getAllFoundItems(), HttpStatus.OK);
    }

    // Report a Found Item (with Image Upload)
    @PostMapping("/found-item")
    public ResponseEntity<?> reportFoundItem(@RequestPart("foundItem") FoundItem foundItem,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            if (imageFile != null) {
                foundItem.setImageName(imageFile.getOriginalFilename());
                foundItem.setImageType(imageFile.getContentType());
                foundItem.setImage(imageFile.getBytes());
            }
            FoundItem savedItem = foundItemService.reportFoundItem(foundItem);
            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error reporting found item: " + e.getMessage());
        }
    }

    // Get Found Item by ID
    @GetMapping("/founditem/{id}")
    public ResponseEntity<FoundItem> getFoundItemById(@PathVariable int id) {
        FoundItem founditem = foundItemService.getFoundItemById(id);
        if (founditem != null) {
            return new ResponseEntity<>(founditem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(founditem, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/founditem/{founditemId}/image")
    public ResponseEntity<byte[]> getImageByFoundItemId(@PathVariable int founditemId) {
        FoundItem founditem = foundItemService.getFoundItemById(founditemId);
        if (founditem != null && founditem.getImageDate() != null) {
            return ResponseEntity.ok().body(founditem.getImageDate());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Found Item
    @DeleteMapping("/del/{id}")
    public ResponseEntity<String> deleteFoundItem(@PathVariable Integer id) {
        foundItemService.deleteFoundItem(id);
        return ResponseEntity.ok("Found item deleted successfully.");
    }
}
