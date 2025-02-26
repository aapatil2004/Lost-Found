package com.example.aryan.Model;

import java.sql.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "lost_items")
public class LostItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String itemName;
    private String category;

    @Column(name = "date_lost")
    private Date dateLost;

    @Column(name = "time_lost")
    private String timeLost;

    @Column(name = "location_lost")
    private String locationLost;

    private String color;

    @Column(name = "brand_model")
    private String brandModel;

    @Column(name = "special_identifiers", length = 1000)
    private String specialIdentifiers;

    @Column(length = 1000)
    private String description;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String email;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_type")
    private String imageType;

    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    @Lob // Store image as large binary data
    private byte[] imageData;

    public void setImage(byte[] bytes) {
        if (bytes == null || bytes.length == 0) {
            throw new IllegalArgumentException("Image data must not be null or empty.");
        }
        this.imageData = bytes;
    }
}
