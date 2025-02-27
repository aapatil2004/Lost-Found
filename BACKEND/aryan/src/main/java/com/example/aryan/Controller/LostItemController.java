package com.example.aryan.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @RequestMapping("/lostitems")
    public ResponseEntity<List<LostItem>> getAllLostItems() {
        return new ResponseEntity<>(lostItemService.getAllLostItems(), HttpStatus.OK);
    }

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

    // Get Lost Item by ID
    @GetMapping("/lostitem/{id}")
    public ResponseEntity<LostItem> getLostItemById(@PathVariable int id) {
        LostItem lostitem = lostItemService.getLostItemById(id);
        if (lostitem != null) {
            return new ResponseEntity<>(lostitem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(lostitem, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/lostitem/{lostitemId}/image")
    public ResponseEntity<byte[]> getImageByLostItemId(@PathVariable int lostitemId) {
        LostItem lostitem = lostItemService.getLostItemById(lostitemId);
        if (lostitem != null && lostitem.getImageDate() != null) {
            return ResponseEntity.ok().body(lostitem.getImageDate());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete Lost Item
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLostItem(@PathVariable Integer id) {
        lostItemService.deleteLostItem(id);
        return ResponseEntity.ok("Lost item deleted successfully.");
    }
}
