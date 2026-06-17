import { Bed } from 'lucide-react';
import { roomTranslations } from './roomTranslations.js';

export const sampleRooms = [
  {
    id: 1,
    title: "Mulla's 1RK",
    rent: 6000,
    pricingType: 'perRoom',
    note: "with including light and water bill , 2 Students are required in this 1RK.",
    contact: "+91 9890491855",
    address: "Salokhe Nagar, Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "50m away from College Gate",
    mapLink: "https://maps.app.goo.gl/iSpymFmgpNX7F22X7?g_st=aw",
    gender: "boy",
    roomType: "1 RK",
    rooms: "1 RK & 1RK",
    images: [
      "/Ayan Mulla/mulla 0_converted_converted.avif",
      "/Ayan Mulla/mulla 1_converted.avif",
      "/Ayan Mulla/mulla 2_converted.avif",
      "/Ayan Mulla/mulla 3_converted.avif",
      "/Ayan Mulla/mulla 4_converted.avif",
      "/Ayan Mulla/mulla 5_converted.avif",
      "/Ayan Mulla/mulla 6_converted.avif",
      "/Ayan Mulla/mulla 7_converted.avif",
      "/Ayan Mulla/mulla 8_converted.avif",
      "/Ayan Mulla/mulla 9_converted.avif",
      "/Ayan Mulla/mulla 10_converted.avif",
      "/Ayan Mulla/mulla 11_converted.avif"
    ],
    description: "5000 Rs. Advance , Gas Geyser Cylinder Should Refill by students ,The rent should be paid between the 1st and 10th of each month ,Student Addhar card , photo and paraent phone number is mandatory , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , ",
    features: ["GAS GEYSER", "WIFI", "WATER SUPPLY", "Charging Bulb for electricity issue", "PARKING", "Study Table for Students", "3 CHAIRS FOR STUDENTS", "MESS IN NEIGHBOUR HOUSE", "TERRACE ACCESS"],
    hidden: false
  },
  {
    id: 2,
    title: "Sangita Gavde's Single Room",
    rent: 1500,
    note: "without including light and water bill",
    contact: "+91 7219637257",
    address: "879/53, More Mane Nagar, Shivganga Colony, Kolhapur, Maharashtra 416011",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "50m away from DYPSN College Gate , Behind Canteen Mess ",
    mapLink: "https://goo.gl/maps/9FvULyBjMRWmYziG8?g_st=aw",
    gender: "boy",
    roomType: "Single Room",
    rooms: "Single Room",
    images: [
      "/Sabgita Gavde/S Gavde 0_converted_converted.avif",
      "/Sabgita Gavde/S Gavde 1_converted.avif",
      "/Sabgita Gavde/S Gavde 2_converted.avif",
      "/Sabgita Gavde/S Gavde 3_converted.avif"
    ],
    description: "2 Boys can stay in this room, 1 YEAR AGREEMENT ,1000 Rs. Deposite ,After 11pm no entry , Friends are not allowed in room .",
    features: ["WIFI", "WATER SUPPLY", "fOR LIGHT BILL SEPRATE METER", "PARKING", "GAS GEYSER"],
    hidden: false
  },
  {
    id: 3,
    title: "Dipali Teli's 1RK",
    rent: 2000,
    note: " Rent including light and water bill,2 girls is required in this room.",
    contact: "+91 7568183951",
    address: "Survey Nagar ,Klamaba.",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "150m away from DYPSN College Gate, Infront of Mug Kirana Shop ,",
    mapLink: "https://maps.app.goo.gl/wwbd9bpKvDYmuowo6?g_st=aw",
    gender: "girl",
    roomType: "1 RK",
    rooms: "1 RK",
    images: [
      "/Dipali Teli/Teli 0_converted_converted.avif",
      "/Dipali Teli/Teli 1_converted.avif",
      "/Dipali Teli/Teli 2_converted.avif",
      "/Dipali Teli/Teli 3_converted.avif",
      "/Dipali Teli/Teli 4_converted.avif",
      "/Dipali Teli/Teli 5_converted.avif",
      "/Dipali Teli/Teli 6_converted.avif",
      "/Dipali Teli/Teli 7_converted.avif"
    ],
    description: "After 09:30 pm  no entry , Only Praents Allowed in room except brother , addhar card and photo of student  is mandatory ",
    features: ["PARKING", "WATER SUPPLY", "SELF COOKING  ALLOW", "OWNER HAVE MESS", "TERRACE ACCESS"],
    hidden: false
  },
  {
    id: 4,
    title: "Trimurti House",
    rent: 1700,
    note: "Including light and water bill , 1 girl is required in this room.",
    contact: "+91 8999181429",
    address: " More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "300m away from DYPSN College Gate, Girls PG Area",
    mapLink: "https://goo.gl/maps/pc8vTXNy433X5CVq6?g_st=aw",
    gender: "girl",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Trimurti House/house 0_converted.avif",
      "/Trimurti House/house 1_converted.avif",
      "/Trimurti House/house 2_converted.avif",
      "/Trimurti House/house 3_converted.avif",
      "/Trimurti House/house 4_converted.avif",
      "/Trimurti House/house 5_converted.avif",
      "/Trimurti House/house 6_converted.avif"
    ],
    description: "After 10pm no entry , Self cooking not allowed , 1700 Rs. Advance , addhar car and student photo is mandatory ",
    features: ["WIFI", "GEYSER", "WATER SUPPLY", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "AQUA FILTRE"],
    hidden: false
  },
  {
    id: 5,
    title: "SHREE SWAMI SAMARTH GIRLS HOSTEL",
    rent: 2000,
    note: "Including light and water bill , 1 girl is needed can stay in this room.",
    contact: "+91 9975867802",
    address: "MORE MANE NAGAR KALAMBA ",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "320m away from DYPSN College Gate, Girls PG Area",
    mapLink: "https://maps.app.goo.gl/Ydgb2vWPs4hGAUfa8?g_st=aw",
    gender: "girl",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/more sir girls hostel/hostel 0.avif",
      "/more sir girls hostel/hostel 1.avif",
      "/more sir girls hostel/hostel 2_converted.avif",
      "/more sir girls hostel/hostel 3_converted.avif",
      "/more sir girls hostel/hostel 4_converted.avif",
      "/more sir girls hostel/hostel 5_converted.avif",
      "/more sir girls hostel/hostel 6_converted.avif",
      "/more sir girls hostel/hostel 7_converted.avif",
      "/more sir girls hostel/hostel 8_converted.avif",
      "/more sir girls hostel/hostel 9_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry(Entry gate locked) , Self cooking not allowed , 2000 Rs. Advance , addhar car and student photo is mandatory ",
    features: ["3 Floor buliding", "WIFI", "GEYSER", "WATER SUPPLY", "Cloth Drying Area", "TERRACE ACCESS", "PARKING", "CCTV CAMERA", "SECURITY", "BEDS", "CUBERT", "LADY DOCTOR SUPPORT", "shoes stand", "Grbage Mnagement by owner", "Parents allowed for stay", "Solar Panel"]
    , hidden: true
  },
  {
    id: 6,
    title: "RUPALI NIKAM'S 1RK",
    rent: 1700,
    note: "Including light and water bill , 4/5 GIRLS can stay in this room.",
    contact: "+91 8855883164",
    address: "MORE MANE NAGAR ,Klamaba.",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "300m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.google.com/?q=987+Budget+Street+Student+Area",
    gender: "girl",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Rupali Nikam/Rupali 0_converted.avif",
      "/Rupali Nikam/Rupali 1_converted.avif",
      "/Rupali Nikam/Rupali 2_converted.avif",
      "/Rupali Nikam/Rupali 3_converted.avif",
      "/Rupali Nikam/Rupali 4_converted.avif",
      "/Rupali Nikam/Rupali 5_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory. ",
    features: ["WIFI", "Hot Water", "PARKING", "WATER SUPPLY", "Cubert", "Basic furniture", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "STUDY TABLE FOR STUDENTS", "PARKING", "Mattress", "shoes stand", "Parets allowed for stay"]
    , hidden: true
  },
  {
    id: 7,
    title: "Swati Naik's House",
    rent: 1500,
    note: "Including light and water bill, 3 boys is required in this room.",
    contact: "+91 9922113453",
    address: "More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "300m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.app.goo.gl/iwbvTqrh6DGkvww76?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK , 1RK & 1 Hall",
    images: [
      "/Swati Naik/swati 0_converted.avif",
      "/Swati Naik/swati 1_converted.avif",
      "/Swati Naik/swati 2_converted.avif",
      "/Swati Naik/swati 3_converted.avif",
      "/Swati Naik/swati 4_converted.avif",
      "/Swati Naik/swati 5_converted.avif",
      "/Swati Naik/swati 6_converted.avif",
      "/Swati Naik/swati 7_converted.avif",
      "/Swati Naik/swati 8_converted.avif",
      "/Swati Naik/swati 9_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card photo and parent phone number is mandatory. ",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "STUDY TABLE FOR STUDENTS", "PARKING", "BEDS", "shoes stand", "Parets allowed for stay"],
    hidden: false
  },
  {
    id: 8,
    title: "Vimal Ashok Patil's 1RK",
    rent: 2000,
    note: "Including light and water bill , 2 boys is required in this room.",
    contact: "+91 8421150854",
    address: "Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "600m away from DYPSN College Gate, Near Karvir Chicken Shop , Kalamba.",
    mapLink: "https://maps.app.goo.gl/bYt8aXNyASz1KWhW7?g_st=aw",
    gender: "boy",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Vimal Patil/Vimal 0_converted.avif",
      "/Vimal Patil/Vimal 1_converted.avif",
      "/Vimal Patil/Vimal 2_converted.avif",
      "/Vimal Patil/Vimal 3_converted.avif",
      "/Vimal Patil/Vimal 4_converted.avif",
      "/Vimal Patil/Vimal 5_converted.avif",
      "/Vimal Patil/Vimal 6_converted.avif",
      "/Vimal Patil/Vimal 7_converted.avif",
      "/Vimal Patil/Vimal 8_converted.avif",
      "/Vimal Patil/Vimal 9_converted.avif",
    ],
    description: "2000 Rs. Advance , 1 YEAR AGREEMENT ,The rent should be paid between the 1st and 10th of each month, Self Cleaning , After 10pm no entry  , addhar card and student photo and parent phone number is mandatory ",
    features: ["Beds", "Mattress", "Water Supply", "Dressing Table", "Water Supply", "Self Cooking allowed", "Parking", "Shoes stand", "cloth Drying Space ", "Charging Bulb for electricity issue", "Water Jar Provided for Drinking Water", "Market Accessible"],
    hidden: false
  },
  {
    id: 9,
    title: "SARIKA LAXMAN KOPARDEKAR'S 1RK",
    rent: 1700,
    note: "Including light and water bill , 5 GIRLS can stay in this room.",
    contact: "+91 9763539136",
    address: "More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "300m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.app.goo.gl/iwbvTqrh6DGkvww76?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 0_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 1_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 2_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 3_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 4_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 5_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory. ",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "STUDY TABLE FOR STUDENTS", "PARKING", "Mattress", "shoes stand", "Parets allowed for stay"]
    , hidden: true
  },
  {
    id: 10,
    title: "Arjun Patil's House",
    rent: 2000,
    note: "Including light and water bill. 5 boys is required in this room.",
    contact: "+91 9975099944",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "72m away from DYPSN College Gate, Behind Gavli Mess.",
    mapLink: "https://maps.app.goo.gl/BSaCPfDSAueXuXYQ7?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK, 1RK & 1 Hall",
    images: [
      "/Arjun Patil/Arjun 0_converted.avif",
      "/Arjun Patil/Arjun 1_converted.avif",
      "/Arjun Patil/Arjun 2_converted.avif",
      "/Arjun Patil/Arjun 3_converted.avif",
      "/Arjun Patil/Arjun 4_converted.avif",
      "/Arjun Patil/Arjun 5_converted.avif",
      "/Arjun Patil/Arjun 6_converted.avif",
      "/Arjun Patil/Arjun 7_converted.avif",
      "/Arjun Patil/Arjun 8_converted.avif",
      "/Arjun Patil/Arjun 9_converted.avif",
      "/Arjun Patil/Arjun 10_converted.avif",
      "/Arjun Patil/Arjun 11_converted.avif",
      "/Arjun Patil/Arjun 12_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,If some damage happen in room by Student then they have to pay for that , 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , Self Cooking not allowed.",
    features: ["WIFI", "WATER SUPPLY", "NEAR BY MESS", "TERRACE ACCESS", "BEDS", "shoes stand", "Parets allowed for stay"],
    hidden: false
  },
  {
    id: 11,
    title: "SURYAKANT SANGPAL HOUSE",
    rent: 2000,
    note: "Without including light and water bill , 4 Boys per room and 8 Boys can stay in this 3 FLOOR HOUSE.",
    contact: "+91 9975098773",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "100m away from DYPSN College Gate, Behind Gavli Mess.",
    mapLink: "https://goo.gl/maps/4Xn1fdBChd95sgpz6?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Suuryakant Sapkal/sangpal 0_converted.avif",
      "/Suuryakant Sapkal/sangpal 1_converted.avif",
      "/Suuryakant Sapkal/sangpal 2_converted.avif",
      "/Suuryakant Sapkal/sangpal 3_converted.avif",
      "/Suuryakant Sapkal/sangpal 4_converted.avif",
      "/Suuryakant Sapkal/sangpal 5_converted.avif",
      "/Suuryakant Sapkal/sangpal 6_converted.avif",
      "/Suuryakant Sapkal/sangpal 7_converted.avif",
      "/Suuryakant Sapkal/sangpal 8_converted.avif",
      "/Suuryakant Sapkal/sangpal 9_converted.avif",
      "/Suuryakant Sapkal/sangpal 10_converted.avif",
      "/Suuryakant Sapkal/sangpal 11_converted.avif",
      "/Suuryakant Sapkal/sangpal 12_converted.avif",
      "/Suuryakant Sapkal/sangpal 13_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,If some damage happen in room by Student then they have to pay for that , 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Self Cleaning , After 10pm no entry , Friends are not allowed in room  .",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "PARKING", "Parets allowed for stay only one day"],
    hidden: false
  },
  {
    id: 12,
    title: "SWAMI SAMARTH HOUSE (ROHIT RANJIT BENDARE)",
    rent: 1800,
    note: "Including light and water bill , 8 GIRLS can stay in this room.",
    contact: "+91 8855903406",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "100m away from DYPSN College Gate, .",
    mapLink: "https://maps.app.goo.gl/9EZtgicry5Wd4zyt7?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Rohit Bendare/rohit 0_converted.avif",
      "/Rohit Bendare/rohit 1_converted.avif",
      "/Rohit Bendare/rohit 2_converted.avif",
      "/Rohit Bendare/rohit 3_converted.avif",
      "/Rohit Bendare/rohit 4_converted.avif",
      "/Rohit Bendare/rohit 5_converted.avif",
      "/Rohit Bendare/rohit 6_converted.avif",
      "/Rohit Bendare/rohit 7_converted.avif",
      "/Rohit Bendare/rohit 8_converted.avif"
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry.",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "OWNER'S MESS", "NEAR BY MESS", "TERRACE ACCESS", "PARKING", "BEDS", "Mattress", "Parets allowed for stay", "Charging Bulb for ELECTRICITY issue"]
    , hidden: true
  },
  {
    id: 13,
    title: "DIPAK CHOUGALE'S HOUSE",
    rent: 2000,
    note: "Including light and water bill , 3 girls is required in this room.",
    contact: "+91 9930407171",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "100m away from DYPSN College Gate, Near Arjun Patil's House.",
    mapLink: "https://maps.app.goo.gl/DXAs81tDtrg1B4Nw5?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Dipak Chougale/front_converted.avif",
      "/Dipak Chougale/chougale 0_converted.avif",
      "/Dipak Chougale/chougale 1_converted.avif",
      "/Dipak Chougale/chougale 2_converted.avif",
      "/Dipak Chougale/chougale 3_converted.avif",
      "/Dipak Chougale/chougale 4_converted.avif",
      "/Dipak Chougale/chougale 5_converted.avif",
      "/Dipak Chougale/chougale 6_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory ,Only Laptop and Mobile Charging is allowed , Hairdryer and other electronics is not allowed , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , Self Cooking not allowed.",
    features: ["WIFI", "WATER SUPPLY", "NEAR BY MESS", "TERRACE ACCESS", "BEDS", "shoes stand", "Parets allowed for stay", "Charging Bulb for ELECTRICITY issue", "Self cooking allowed", "dedicated space for washing cloth", "Stairs with Auto Light Sensor"]
    , hidden: true
  },
  {
    id: 14,
    title: "BADAM SALOKHE'S HOUSE",
    rent: 2000,
    note: "Including light and water bill , 2 girls is required in this room.",
    contact: "+91 9822673489",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "100m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.app.goo.gl/3M5fqmDY7AAWcDA6A?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Badam Salokhe/1bhk/badam_converted (1).avif",
      "/Badam Salokhe/1bhk/Badam 0_converted.avif",
      "/Badam Salokhe/1bhk/Badam 1_converted.avif",
      "/Badam Salokhe/1bhk/Badam 2_converted.avif",
      "/Badam Salokhe/1bhk/Badam 3_converted.avif",
      "/Badam Salokhe/1bhk/Badam 4_converted.avif",
      "/Badam Salokhe/1bhk/Badam 5_converted.avif",
      "/Badam Salokhe/1bhk/Badam 6_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , If there are three student in room then the electricity and water bill will be paid by students",
    features: ["WIFI(If Student want they can have it by their own)", "HOT WATER", "WATER SUPPLY", "Parking", "SELF COOKING ALLOW", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay"],
    hidden: false
  },
  {
    id: 15,
    title: "BADAM SALOKHE'S HOUSE",
    rent: 2000,
    note: "Including light and water bill , 3 boys is required in this room.",
    contact: "+91 9822673489",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "100m away from DYPSN College Gate, Near Gurukrupa Mess.",
    mapLink: "https://maps.app.goo.gl/8Xs7bWKifv9cf6vo8?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Badam Salokhe/cot basis/badam_converted.avif",
      "/Badam Salokhe/cot basis/cot 0_converted.avif",
      "/Badam Salokhe/cot basis/cot 1_converted.avif",
      "/Badam Salokhe/cot basis/cot 2_converted.avif",
      "/Badam Salokhe/cot basis/cot 3_converted.avif",
      "/Badam Salokhe/cot basis/cot 4_converted.avif",
      "/Badam Salokhe/cot basis/cot 5_converted.avif",
      "/Badam Salokhe/cot basis/cot 6_converted.avif",
      "/Badam Salokhe/cot basis/cot 7_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance , No drinking and smoking allowed in room, STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , Good Behaviour is required",
    features: ["WIFI", "HOT WATER", "WATER SUPPLY", "Parking", "Beds", "Mattress", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay"],
    hidden: false
  },
  {
    id: 16,
    title: "KIRAN KARAGJAR'S HOUSE",
    rent: 1800,
    note: "Including light and water bill , 2 Boys is required in this room.",
    contact: "+91 9890489797",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "90m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/3foeiBa4Vc4Jx8C77?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Kiran Karagjar/kiran 0_converted.avif",
      "/Kiran Karagjar/kiran 1_converted.avif",
      "/Kiran Karagjar/kiran 2_converted.avif",
      "/Kiran Karagjar/kiran 3_converted.avif",
      "/Kiran Karagjar/kiran 4_converted.avif",
      "/Kiran Karagjar/kiran 5_converted.avif",
      "/Kiran Karagjar/kiran 6_converted.avif",
      "/Kiran Karagjar/kiran 7_converted.avif",
      "/Kiran Karagjar/kiran 8_converted.avif",
      "/Kiran Karagjar/kiran 9_converted.avif",
      "/Kiran Karagjar/kiran 10_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , If there are three student in room then the electricity and water bill will be paid by students",
    features: ["WIFI(If Student want they can have it by their own)", "HOT WATER", "WATER SUPPLY", "Parking", "SELF COOKING ALLOW", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "Electric Induction for Cooking", "Beds", "Mattress", "TERRACE ACCESS", "PARKING", "Parets allowed for stay", "Near by mess"],
    hidden: false
  },
  {
    id: 17,
    title: "SANJAY GANAPATI JADHAV'S HOUSE",
    rent: 1600,
    note: "Including light and water bill , 9 BOYS can stay in this room.",
    contact: "+91 9423275126",
    address: "Kalamba Lake , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "1.5km away from DYPSN College Gate, Near Kalamba Lake Waterfall.",
    mapLink: "https://goo.gl/maps/s1Ew2DPs6TYyER449?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "2 BHK",
    images: [
      "/Sanjay Ganpati Jadhav/Sanjay 0_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 1_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 2_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 3_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 4_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 5_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 6_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 7_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 8_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 9_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 10_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 11_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 12_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 13_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 25th and 5th of each month ,After 10pm no entry, 3000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Good Behaviour is required,  Group Studies are not allowed, Self Cleaning is required, After 10pm no entry, Friends are not allowed in room  , Self Cleaning .",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "Hot Water", "NEAR BY MESS", "TERRACE ACCESS", "PARKING", "Parets allowed for stay", "20m away Kalamba Waterfall"],
    hidden: false
  },
  {
    id: 18,
    title: "PANKAJ WAGHMARE'S HOUSE",
    rent: 1600,
    note: "Including light and water bill , 7 BOYS can stay in this room.",
    contact: "+91 9822264124",
    address: "Kalamba Lake , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "1.5km away from DYPSN College Gate, Near Kalamba Lake Waterfall.",
    mapLink: "https://goo.gl/maps/s1Ew2DPs6TYyER449?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Pankaj Waghmare/pankaj 0_converted.avif",
      "/Pankaj Waghmare/pankaj 1_converted.avif",
      "/Pankaj Waghmare/pankaj 2_converted.avif",
      "/Pankaj Waghmare/pankaj 3_converted.avif",
      "/Pankaj Waghmare/pankaj 4_converted.avif",
      "/Pankaj Waghmare/pankaj 5_converted.avif",
      "/Pankaj Waghmare/pankaj 6_converted.avif",
      "/Pankaj Waghmare/pankaj 7_converted.avif",
      "/Pankaj Waghmare/pankaj 8_converted.avif",
      "/Pankaj Waghmare/pankaj 9_converted.avif",
      "/Pankaj Waghmare/pankaj 10_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory. ",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "PARKING", "shoes stand", "Parets allowed for stay"],
    hidden: false
  },
  {
    id: 19,
    title: "SUREKHA GAVLI'S HOUSE(GAVLI MESS)",
    rent: 2000,
    note: "Including light and water bill , 1 Boys is required in this room.",
    contact: "+91 7057831999",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "60m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/4NxWJ6PUYktSKdjC6?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Surekha Gavli/gavli 0_converted.avif",
      "/Surekha Gavli/gavli 1_converted.avif",
      "/Surekha Gavli/gavli 2_converted.avif",
      "/Surekha Gavli/gavli 3_converted.avif",
      "/Surekha Gavli/gavli 4_converted.avif",
      "/Surekha Gavli/gavli 5_converted.avif",
      "/Surekha Gavli/gavli 6_converted.avif",
      "/Surekha Gavli/gavli 7_converted.avif",
      "/Surekha Gavli/gavli 8_converted.avif",
      "/Surekha Gavli/gavli 9_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Self Cleaning is required, After 10pm no entry, Friends are not allowed in room  , Self Cleaning , Good Behaviour is required",
    features: ["WIFI", "CHARGING BULB FOR ELECTRICITY ISSUE", "New Rooms", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "PARKING", "Parets allowed for stay", "Owner's Mess"],
    hidden: false
  },
  {
    id: 20,
    title: "Abhiya Parkar's House",
    rent: 2000,
    note: "Including light and water bill , 4 Boys can stay in this room.",
    contact: "+91 9420258442",
    address: "Survey Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "900m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/zFmaM4EvcrAHpNg1A?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Abhiya Parkar/parkar 0_converted.avif",
      "/Abhiya Parkar/parkar 1_converted.avif",
      "/Abhiya Parkar/parkar 2_converted.avif",
      "/Abhiya Parkar/parkar 3_converted.avif",
      "/Abhiya Parkar/parkar 4_converted.avif",
      "/Abhiya Parkar/parkar 5_converted.avif",
      "/Abhiya Parkar/parkar 6_converted.avif",
      "/Abhiya Parkar/parkar 7_converted.avif",
      "/Abhiya Parkar/parkar 8_converted.avif",
      "/Abhiya Parkar/parkar 9_converted.avif",
      "/Abhiya Parkar/parkar 10_converted.avif",
      "/Abhiya Parkar/parkar 11_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance , No drinking and smoking allowed in room, STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room , Grabage Management by students, Self Cleaning , Good Behaviour is required",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "Parets allowed for stay"]
    , hidden: true
  },
  {
    id: 21,
    title: "Matoshree House",
    rent: 2000,
    note: "Including light and water bill , 5 boys is required in this room.",
    contact: "+91 9028083205",
    address: "More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "300m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.app.goo.gl/oxd6jxXUy5jqKwS48",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Matoshree House/shree 0_converted.avif",
      "/Matoshree House/shree 1_converted.avif",
      "/Matoshree House/shree 2_converted.avif",
      "/Matoshree House/shree 3_converted.avif",
      "/Matoshree House/shree 4_converted.avif",
      "/Matoshree House/shree 5_converted.avif",
      "/Matoshree House/shree 6_converted.avif",
      "/Matoshree House/shree 7_converted.avif",
      "/Matoshree House/shree 8_converted.avif",
      "/Matoshree House/shree 9_converted.avif",
      "/Matoshree House/shree 10_converted.avif",
      "/Matoshree House/shree 11_converted.avif",
      "/Matoshree House/shree 12_converted.avif",
      "/Matoshree House/shree 13_converted.avif",
      "/Matoshree House/shree 14_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 5th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory,  Friends are not allowed in room  , Self Cleaning , Good Behaviour is required , Grabage Management by students",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "PARKING", "BEDS", "shoes stand", "Parets allowed for stay"],
    hidden: false
  },
  {
    id: 22,
    title: "Vaibhav Patil's House",
    rent: 1800,
    note: "Including light and water bill , 3 Boys can stay in this room.",
    contact: "+91 7020287835",
    address: "Survey Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "110m away from DYPSN College Gate.Near Vimal Hospital",
    mapLink: "https://maps.app.goo.gl/XeZT5qhenUaJhVaD8?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Vaibhav Anandrav Patil/patil 0_converted.avif",
      "/Vaibhav Anandrav Patil/patil 1_converted.avif",
      "/Vaibhav Anandrav Patil/patil 2_converted.avif",
      "/Vaibhav Anandrav Patil/patil 3_converted.avif",
      "/Vaibhav Anandrav Patil/patil 4_converted.avif",
      "/Vaibhav Anandrav Patil/patil 5_converted.avif",
      "/Vaibhav Anandrav Patil/patil 6_converted.avif",
      "/Vaibhav Anandrav Patil/patil 7_converted.avif",
      "/Vaibhav Anandrav Patil/patil 8_converted.avif",
      "/Vaibhav Anandrav Patil/patil 9_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory. ",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "STUDY TABLE FOR STUDENTS", "PARKING", "BEDS", "shoes stand", "Parets allowed for stay"],
    hidden: true
  },
  {
    id: 23,
    title: "HAIBHAU SAVARATKAR'S HOUSE",
    rent: 2000,
    note: "Including light and water bill , 2/3 STUDENTS can stay in this room.",
    contact: "+91 9730456081",
    address: "Survey Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "450m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/EQZqAZwxrhii4SwUA?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Haribhau Savaratkar/hari 0_converted.avif",
      "/Haribhau Savaratkar/hari 1_converted.avif",
      "/Haribhau Savaratkar/hari 2_converted.avif",
      "/Haribhau Savaratkar/hari 3_converted.avif",
      "/Haribhau Savaratkar/hari 4_converted.avif",
      "/Haribhau Savaratkar/hari 5_converted.avif",
      "/Haribhau Savaratkar/hari 6_converted.avif",
      "/Haribhau Savaratkar/hari 7_converted.avif",



    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , If there are two student in room then the electricity and water bill will be paid by students, Garbage Management by students,Electric Induction not allowed for cooking,Good Behaviour is required",
    features: ["WIFI(If Student want they can have it by their own)", "HOT WATER", "WATER SUPPLY", "Parking", "SELF COOKING ALLOW", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay", "Near by mess"]
    , hidden: true
  },
  {
    id: 24,
    title: "Morya Mess",
    rent: 1800,
    note: "Including light and water bill , 4 BOYS needed to stay in this room.",
    contact: "+91 9673860526",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "50m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/sm5JZRbvKpb7pqUT6?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Morya Mess/morya 0_converted.avif",
      "/Morya Mess/morya 1_converted.avif",
      "/Morya Mess/morya 2_converted.avif",
      "/Morya Mess/morya 3_converted.avif",
      "/Morya Mess/morya 4_converted.avif",
      "/Morya Mess/morya 5_converted.avif",
      "/Morya Mess/morya 6_converted.avif?v=2",
      "/Morya Mess/morya 7_converted.avif?v=2",
      "/Morya Mess/morya 8_converted.avif?v=2"
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 5th of each month , 2000 Rs. Advance , No drinking and smoking allowed in room, STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , Garbage Management by students",
    features: ["WIFI(50% Recharge by Student)", "HOT WATER", "WATER SUPPLY", "Parking", "Beds", "Mattress", "Owner's  MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parents allowed for stay", "CUBERT", "Clenaing Fluids are Provided by Room Owner when needed"],
    hidden: false
  },

  {
    id: 25,
    title: "Hemant Amble's House",
    rent: 1700,
    note: "Including light and water bill , 4 GIRLS needed to stay in this room.",
    contact: "+91 9623135707",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "70m away from DYPSN College Gate, Near GuruKrupa Mess.",
    mapLink: "https://maps.app.goo.gl/N6JB1pJWAj9gevMb8?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Hemant Amble/amble 0_converted.avif",
      "/Hemant Amble/amble 1_converted.avif",
      "/Hemant Amble/amble 2_converted.avif",
      "/Hemant Amble/amble 3_converted.avif",
      "/Hemant Amble/amble 4_converted.avif",
      "/Hemant Amble/amble 5_converted.avif",
      "/Hemant Amble/amble 6_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry  , Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "Group Studies Allowed", "Shoes Stand", "WATER SUPPLY", "Parking", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay"]
    , hidden: true
  },
  {
    id: 26,
    title: "Raosaheb Naik's House",
    rent: 1700,
    note: "Including light and water bill , 1 Boy is required in this room.",
    contact: "+91 9423825260",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "50m away from DYPSN College Gate, Infront Of Vijaya Canteen.",
    mapLink: "https://maps.app.goo.gl/18DGno4JqcGt245x8?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Raosaheb Naik/naik 0_converted.avif",
      "/Raosaheb Naik/naik 1_converted.avif",
      "/Raosaheb Naik/naik 2_converted.avif",
      "/Raosaheb Naik/naik 3_converted.avif",
      "/Raosaheb Naik/naik 4_converted.avif",
      "/Raosaheb Naik/naik 5_converted.avif",
      "/Raosaheb Naik/naik 6_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1800 Rs. Advance ,  After 10pm no entry ,STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning    , Self Cleaning , Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "Group Studies Allowed", "Shoes Stand", "WATER SUPPLY", "Parking", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay", "Near by mess"],
    hidden: false
  },
  {
    id: 27,
    title: "Alka Naik's House",
    rent: 1700,
    note: "Including light and water bill , 7 Boys needed to stay in this room.",
    contact: "+91 9423271691",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "50m away from DYPSN College Gate,",
    mapLink: "https://maps.app.goo.gl/z9aE94LYzoDba1d26?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Alka Naik/Alka 0_converted.avif",
      "/Alka Naik/Alka 1_converted.avif",
      "/Alka Naik/Alka 2_converted.avif",
      "/Alka Naik/Alka 3_converted.avif",
      "/Alka Naik/Alka 4_converted.avif",
      "/Alka Naik/Alka 5_converted.avif",
      "/Alka Naik/Alka 6_converted.avif",
      "/Alka Naik/Alka 7_converted.avif",
      "/Alka Naik/Alka 8_converted.avif",
      "/Alka Naik/Alka 9_converted.avif",
      "/Alka Naik/Alka 10_converted.avif",
      "/Alka Naik/Alka 11_converted.avif"
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1800 Rs. Advance ,  After 10pm no entry ,STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning    , Self Cleaning , Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "New Room", "HOT WATER", "Group Studies Allowed", "Shoes Stand", "WATER SUPPLY", "Parking", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay", "Near by mess"],
    hidden: false
  },
  {
    id: 28,
    title: "Vijay Jadhav's House",
    rent: 2000,
    note: "Including light and water bill , 4 Boys can stay in this room.",
    contact: "+91 9379767676",
    address: "Prathamesh Nagar , Near Blossom School",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "300m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/gyjQXpGUezrS5cKw5?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Vijay Jadhav/vijay 0_converted.avif",
      "/Vijay Jadhav/vijay 1_converted.avif",
      "/Vijay Jadhav/vijay 2_converted.avif",
      "/Vijay Jadhav/vijay 3_converted.avif",
      "/Vijay Jadhav/vijay 4_converted.avif",
      "/Vijay Jadhav/vijay 5_converted.avif",
      "/Vijay Jadhav/vijay 6_converted.avif",
      "/Vijay Jadhav/vijay 7_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 5th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory,  Friends are not allowed in room  , Self Cleaning , Good Behaviour is required , Grabage Management by students",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "PARKING", "BEDS", "shoes stand", "Parets allowed for stay"]
    , hidden: true
  },
  {
    id: 29,
    title: "Sanjay Kale's House",
    rent: 1700,
    note: "Including light and water bill , 1 girl is required in this room.",
    contact: "+91 9423858882",
    address: "More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "150m away from DYPSN College Gate",
    mapLink: "https://maps.app.goo.gl/iczXk8Gjy7R3hfeN7?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Sanjay Kale/kale 0_converted.avif",
      "/Sanjay Kale/kale 1_converted.avif",
      "/Sanjay Kale/kale 2_converted.avif",
      "/Sanjay Kale/kale 3_converted.avif",
      "/Sanjay Kale/kale 4_converted.avif",
      "/Sanjay Kale/kale 5_converted.avif",
      "/Sanjay Kale/kale 6_converted.avif",
      "/Sanjay Kale/kale 7_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry  , Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "Group Studies Allowed", "Shoes Stand", "WATER SUPPLY", "Parking", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay"]
    , hidden: true
  },
  {
    id: 30,
    title: "Jayshree Pardhi's House",
    rent: 1800,
    note: "Including light and water bill , 3 GIRLS needed to stay in this room.",
    contact: "+91 9960525255",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "70m away from DYPSN College Gate, Near DakshinMukhi Hanuman Mandir.",
    mapLink: "https://maps.app.goo.gl/LmwXf7hiTRSC3zHN8?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Jayshree Pardhi/jay 0_converted.avif",
      "/Jayshree Pardhi/jay 1_converted.avif",
      "/Jayshree Pardhi/jay 2_converted.avif",
      "/Jayshree Pardhi/jay 3_converted.avif",
      "/Jayshree Pardhi/jay 4_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry  , Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "Group Studies Allowed", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay"]
    , hidden: true
  },
  {
    id: 31,
    title: "Vrushali Gadge's House",
    rent: 2100,
    note: "Including water bill, 1 Boy needed to stay in this room.",
    contact: "+91 9272505991",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "10m away from DYPSN College Gate, Infront of DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/XVmHjvu2zBABn4bM8?g_st=aw",
    gender: "boy",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Vrushali Gadge/gadge 0_converted.avif",
      "/Vrushali Gadge/gadge 1_converted.avif",
      "/Vrushali Gadge/gadge 2_converted.avif",
      "/Vrushali Gadge/gadge 3_converted.avif",
      "/Vrushali Gadge/gadge 4_converted.avif",
      "/Vrushali Gadge/gadge 5_converted.avif",
      "/Vrushali Gadge/gadge 6_converted.avif",
    ],
    description: "2 YEAR AGREEMENT , Light bill is separate , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2100 Rs. Advance ,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry  , Good Behaviour is required",
    features: ["WIFI", "BEDS", "New Room", "HOT WATER", "Self Cooking Allowed", "Group Studies Allowed", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parents allowed for stay", "Mattress", "Study Table for Students", "Near College Gate"],
    hidden: true
  },
  {
    id: 32,
    title: "Sangita Mithari's House",
    rent: 1500,
    note: "Including  water bill ,1 Girl needed to stay and 4 GIRLS can stay in this room.",
    contact: "+91 9421202731",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "70m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/Kw9qMDPCJMwHGvyq8?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Sangita Mithari/mith 0_converted.avif",
      "/Sangita Mithari/mith 1_converted.avif",
      "/Sangita Mithari/mith 2_converted.avif",
      "/Sangita Mithari/mith 3_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry  ,Self Cooking not allowed, Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "STUDY TABLE FOR STUDENTS", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets(ONLY LADIES) allowed for stay"]
    , hidden: true
  },
  {
    id: 33,
    title: "Disha Dilip Kadam's House",
    rent: 1300,
    note: "Including water bill , 1 girl needed , 5 GIRLS can stay in this room.",
    contact: "+91 9921160303",
    address: "Prathamesh Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "200m away from DYPSN College Gate",
    mapLink: "https://maps.app.goo.gl/eRs6iWG3mYnqEZpv6?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "2 BHK",
    images: [
      "/Disha Dilip Kadam/disha 0_converted.avif",
      "/Disha Dilip Kadam/disha 1_converted.avif",
      "/Disha Dilip Kadam/disha 2_converted.avif",
      "/Disha Dilip Kadam/disha 3_converted.avif",
      "/Disha Dilip Kadam/disha 4_converted.avif",
      "/Disha Dilip Kadam/disha 5_converted.avif",
      "/Disha Dilip Kadam/disha 6_converted.avif",
      "/Disha Dilip Kadam/disha 7_converted.avif",
      "/Disha Dilip Kadam/disha 8_converted.avif",
      "/Disha Dilip Kadam/disha 9_converted.avif",
      "/Disha Dilip Kadam/disha 10_converted.avif",
      "/Disha Dilip Kadam/disha 11_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry Gate will be locked and opens at 07 am, 3000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Self Cleaning , No self cooking allowed, Good Behaviour is required, Group Studies not allowed",
    features: ["WIFI(Recharge by Student)", "WATER SUPPLY", "Hot Water", "NEAR BY MESS", "TERRACE ACCESS", "Breakfast allow for cooking", "Parents allowed for stay"],
    hidden: false
  },
  {
    id: 34,
    title: "Ujwala Teke's House",
    rent: 1500,
    note: "Including  water bill ,1 Girl needed to stay and 4 GIRLS can stay in this room.",
    contact: "+91 8806496510",
    address: "More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "200m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/iczXk8Gjy7R3hfeN7?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Ujawala Teke/teke 0_converted.avif",
      "/Ujawala Teke/teke 1_converted.avif",
      "/Ujawala Teke/teke 2_converted.avif",
      "/Ujawala Teke/teke 3_converted.avif",
      "/Ujawala Teke/teke 4_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,Self Cooking not allowed, Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "STUDY TABLE FOR STUDENTS", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "TERRACE ACCESS", "PARKING", "Parents(ONLY LADIES) allowed for stay", "Mattress"]
    , hidden: true
  },
  {
    id: 35,
    title: "Dilip Kadam's House",
    rent: 2000,
    note: "Including  water bill ,1 Boys is required in this room.",
    contact: "+91 7020319571",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "70m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/s5FRY9czMYfEV6mA7?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "2 BHK",
    images: [
      "/Dilip Kadam/dilip 0_converted.avif",
      "/Dilip Kadam/dilip 1_converted.avif",
      "/Dilip Kadam/dilip 2_converted.avif",
      "/Dilip Kadam/dilip 3_converted.avif",
      "/Dilip Kadam/dilip 4_converted.avif",
      "/Dilip Kadam/dilip 5_converted.avif",
      "/Dilip Kadam/dilip 6_converted.avif",
      "/Dilip Kadam/dilip 7_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,Self Cooking not allowed,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parents allowed for stay"]
    , hidden: true
  },
  {
    id: 36,
    title: "Manasi Khanvelkar's House",
    rent: 1800,
    note: "Including  water bill ,3 Girls needed to stay and 4 GIRLS can stay in this room.",
    contact: "+91 7066301144",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "70m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/X5MgbbAqesP2HkU19?g_st=aw ",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "2 BHK",
    images: [
      "/Manasi Khanvelkar/mana 0_converted.avif",
      "/Manasi Khanvelkar/mana 1_converted.avif",
      "/Manasi Khanvelkar/mana 2_converted.avif",
      "/Manasi Khanvelkar/mana 3_converted.avif",
      "/Manasi Khanvelkar/mana 4_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,Self Cooking not allowed,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parents allowed for stay"]
    , hidden: true
  },
  {
    id: 37,
    title: "Seema Choughule's House",
    rent: 1800,
    note: "Including light and water bill ,5 Boys is required in this room.",
    contact: "+91 9021076232",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "30m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/k1xRdUam3eYp26kx5?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Seema Choughule/seema 0_converted.avif",
      "/Seema Choughule/seema 1_converted.avif",
      "/Seema Choughule/seema 2_converted.avif",
      "/Seema Choughule/seema 3_converted.avif",
      "/Seema Choughule/seema 4_converted.avif",
      "/Seema Choughule/seema 5_converted.avif",
      "/Seema Choughule/seema 6_converted.avif",
      "/Seema Choughule/seema 7_converted.avif",
      "/Seema Choughule/seema 8_converted.avif",
      "/Seema Choughule/seema 9_converted.avif",
      "/Seema Choughule/seema 10_converted.avif",
      "/Seema Choughule/seema 11_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,Self Cooking not allowed,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(Recharge by Student)", "BEDS", "New Room", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parents allowed for stay"],
    hidden: false
  },
  {
    id: 38,
    title: "Kusum Rajmane's House",
    rent: 2000,
    note: "Including light and water bill ,4 Boys is required in this room.",
    contact: "+91 9175719356",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "120m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/VWJLigCr4i9xZtLu6?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Kusum Mane/ku 0_converted.avif",
      "/Kusum Mane/ku 1_converted.avif",
      "/Kusum Mane/ku 2_converted.avif",
      "/Kusum Mane/ku 3_converted.avif",
      "/Kusum Mane/ku 4_converted.avif",
      "/Kusum Mane/ku 5_converted.avif",
      "/Kusum Mane/ku 6_converted.avif",
      "/Kusum Mane/ku 7_converted.avif",


    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,Self Cooking not allowed,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "Cubert", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "Aqua Gurad for drinking water", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parents allowed for stay"],
    hidden: false
  },
  {
    id: 39,
    title: "Thorat's House",
    rent: 2000,
    note: "Including light and water bill ,4 Boys is required in this room.",
    contact: "+91 9850380399",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "60m away from DYPSN College Gate.",
    mapLink: "hhttps://maps.app.goo.gl/g1jsrkjAbqMydqtf7?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Thorats room/tho 0_converted.avif",
      "/Thorats room/tho 1_converted.avif",
      "/Thorats room/tho 2_converted.avif",
      "/Thorats room/tho 3_converted.avif",
      "/Thorats room/tho 4_converted.avif",
      "/Thorats room/tho 5_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(Recharge by Student)", "BEDS", "Mattress", "New Room", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "Self Cooking allowed", "TERRACE ACCESS", "PARKING", "Parents allowed for stay"]
    , hidden: true
  },
  {
    id: 40,
    title: "Patankar's House",
    rent: 2000,
    note: "Including light and water bill ,4 Boys is required in this room.",
    contact: "+91 9112310531",
    address: "More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "200m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/iczXk8Gjy7R3hfeN7?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Patankar house/pa 0_converted.avif",
      "/Patankar house/pa 1_converted.avif",
      "/Patankar house/pa 2_converted.avif",
      "/Patankar house/pa 3_converted.avif",
      "/Patankar house/pa 4_converted.avif",
      "/Patankar house/pa 5_converted.avif",
      "/Patankar house/pa 6_converted.avif",
      "/Patankar house/pa 7_converted.avif",
      "/Patankar house/pa 8_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(Recharge by Student)", "BEDS", "Mattress", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "Self Cooking allowed", "TERRACE ACCESS", "Cubert", "PARKING", "Parents allowed for stay"],
    hidden: false
  },
  {
    id: 41,
    title: "Patankar's House",
    rent: 2000,
    note: "Including light and water bill ,2 Girls is required in this room.",
    contact: "+91 9112310531",
    address: "More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "200m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/iczXk8Gjy7R3hfeN7?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Patankar house/pa 0_converted.avif",
      "/Patankar house/pa girls 0_converted.avif",
      "/Patankar house/pa girls 1_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(Recharge by Student)", "BEDS", "Mattress", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "Self Cooking allowed", "TERRACE ACCESS", "Cubert", "PARKING", "Parents allowed for stay"],
    hidden: false
  },
  {
    id: 42,
    title: "Madhuri Sandip Desai's House",
    rent: 2000,
    note: "Including light and water bill ,2 Girls is required in this room.",
    contact: "+91 9823813060",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "50m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/k1xRdUam3eYp26kx5?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Madhuri Sandip Desai/ma 0_converted.avif",
      "/Madhuri Sandip Desai/ma 1_converted.avif",
      "/Madhuri Sandip Desai/ma 2_converted.avif",
      "/Madhuri Sandip Desai/ma 3_converted.avif",
      "/Madhuri Sandip Desai/ma 4_converted.avif",
      "/Madhuri Sandip Desai/ma 5_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(Recharge by Student)", "BEDS", "New Room", "Mattress", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "Self Cooking allowed", "TERRACE ACCESS", "Cubert", "PARKING", "Parents allowed for stay"]
    , hidden: true
  },
  {
    id: 43,
    title: "Mukund Bhat 's House",
    rent: 2000,
    note: "Including water bill , 4 Boys is required in this room.",
    contact: "+91 9370736329",
    address: "Salokhenagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "100m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/k1xRdUam3eYp26kx5?g_st=aw",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Mukund Bhats/bha 0_converted.avif",
      "/Mukund Bhats/bha 1_converted.avif",
      "/Mukund Bhats/bha 2_converted.avif",
      "/Mukund Bhats/bha 3_converted.avif",
      "/Mukund Bhats/bha 4_converted.avif",
      "/Mukund Bhats/bha 5_converted.avif",
      "/Mukund Bhats/bha 6_converted.avif",
      "/Mukund Bhats/bha 7_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENT'S addhar card,Self Cooking not allowed, photo and parent phone number is mandatory , Self Cleaning ,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "HOT WATER", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "Cubert", "PARKING", "Parents allowed for stay"],
    hidden: false
  },
  {
    id: 44,
    title: "Anjana Mohite's House",
    rent: 1800,
    note: "Including light and water bill ,4 Girls is required in this room.",
    contact: "+91 8007414703",
    address: "More Mane Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "200m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/vsPrn3WNTEzQQZjA7?g_st=aw",
    gender: "girls",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Anajna Mohite/mo 0_converted.avif",
      "/Anajna Mohite/mo 1_converted.avif",
      "/Anajna Mohite/mo 2_converted.avif",
      "/Anajna Mohite/mo 3_converted.avif",
      "/Anajna Mohite/mo 4_converted.avif",
      "/Anajna Mohite/mo 5_converted.avif",
      "/Anajna Mohite/mo 6_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning ,No loud sound allowed,Group Studies not allowed,Good Behaviour is required",
    features: ["WIFI(if student want they can have it by their own)", "BEDS", "New Room", "Mattress", "HOT WATER", "Shoes Stand", "WATER SUPPLY", "NEAR BY MESS", "CHARGING BULB FOR ELECTRICITY ISSUE", "Self Cooking allowed", "TERRACE ACCESS", "Cubert", "PARKING", "Parents allowed for stay"],
    hidden: false
  },
  {
    id: 45,
    title: "Shridhar More's House",
    rent: 2000,
    note: "Including light and water bill, 4 Boys are required in this room. Total capacity 7.",
    contact: "+91 7387268182",
    address: "Prathamesh Nagar , Kalamba",
    city: "Kolhapur",
    college: "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    location: "350m away from DYPSN College Gate , Near Matrix Group.",
    mapLink: "https://maps.app.goo.gl/puVyMMVugLTQ4VWB9",
    gender: "boys",
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Shridhar More/sh 0_converted.avif",
      "/Shridhar More/sh 1_converted.avif",
      "/Shridhar More/sh 2_converted.avif",
      "/Shridhar More/sh 3_converted.avif",
      "/Shridhar More/sh 4_converted.avif",
      "/Shridhar More/sh 5_converted.avif",
      "/Shridhar More/sh 6_converted.avif",
      "/Shridhar More/sh 7_converted.avif",
      "/Shridhar More/sh 8_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry,  STUDENT'S addhar card, photo and parent phone number is mandatory , Self Cleaning",
    features: [
      "WIFI (If students want they can install it)", "New Room", "Hot Water", "Parking", "Self Cooking Allowed", "Group Study Allowed", "Cupboard", "Shoe Stand", "Near by Mess", "Terrace Access", "Parents allowed to stay", "Charging Bulbs for Electricity issue"],
    hidden: false
  }




];

// Function to get translated room data
export const getTranslatedRooms = (language = 'en') => {
  const t = (key) => roomTranslations[language]?.[key] || roomTranslations.en[key] || key;

  return sampleRooms.map(room => ({
    ...room,
    title: translateRoomTitle(room.title, t),
    note: translateRoomNote(room.note, t),
    description: translateRoomDescription(room.description, t),
    address: translateAddress(room.address, t),
    location: translateLocation(room.location, t),
    features: Array.isArray(room.features)
      ? room.features.map(feature => translateFeature(feature, t))
      : [],
    roomType: translateRoomType(room.roomType, t),
    rooms: translateRoomType(room.rooms, t)
  }));
};

// Helper functions for translation
const translateRoomTitle = (title, t) => {
  if (!title) return title;

  let translatedTitle = title;

  // Translate common patterns in titles
  translatedTitle = translatedTitle.replace(/1RK/g, t('oneRK'));
  translatedTitle = translatedTitle.replace(/Single Room/g, t('singleRoom'));
  translatedTitle = translatedTitle.replace(/House/g, t('house'));
  translatedTitle = translatedTitle.replace(/Hostel/g, t('hostel'));

  // Translate owner names (keep apostrophe but translate the name)
  translatedTitle = translatedTitle.replace(/Mulla's/g, t('mullas'));
  translatedTitle = translatedTitle.replace(/Sangita Gavde's/g, t('sangitaGavdes'));
  translatedTitle = translatedTitle.replace(/Dipali Teli's/g, t('dipaliTelis'));
  translatedTitle = translatedTitle.replace(/Swati Naik's/g, t('swatiNaiks'));
  translatedTitle = translatedTitle.replace(/Vimal Ashok Patil's/g, t('vimalAshokPatils'));
  translatedTitle = translatedTitle.replace(/Arjun Patil's/g, t('arjunPatils'));
  translatedTitle = translatedTitle.replace(/SARIKA LAXMAN KOPARDEKAR'S/g, t('sarikaLaxmanKopardekars'));
  translatedTitle = translatedTitle.replace(/RUPALI NIKAM'S/g, t('rupaliNikams'));
  translatedTitle = translatedTitle.replace(/SHREE SWAMI SAMARTH GIRLS HOSTEL/g, t('shreeSwamiSamarthGirlsHostel'));
  translatedTitle = translatedTitle.replace(/RUPALI NIKAM'S/g, t('rupaliNikams'));
  translatedTitle = translatedTitle.replace(/Patankar's/g, t('patankars'));
  translatedTitle = translatedTitle.replace(/Madhuri Sandip Desai's/g, t('madhuriSandipDesais'));
  translatedTitle = translatedTitle.replace(/Anjana Mohite's/g, t('anjanaMohites'));
  translatedTitle = translatedTitle.replace(/Mukund Bhat's/g, t('mukundBhats'));

  // Add missing translations for other rooms
  translatedTitle = translatedTitle.replace(/Morya Mess/g, t('moryaMess'));
  translatedTitle = translatedTitle.replace(/Hemant Amble's House/g, t('hemantAmbelsHouse'));
  translatedTitle = translatedTitle.replace(/HAIBHAU SAVARATKAR'S HOUSE/g, t('haibhauSavaratkarsHouse'));
  translatedTitle = translatedTitle.replace(/Vaibhav Patil's House/g, t('vaibhavPatilsHouse'));
  translatedTitle = translatedTitle.replace(/Matoshree House/g, t('matoshreeHouse'));
  translatedTitle = translatedTitle.replace(/Abhiya Parkar's House/g, t('abhiyaParkarsHouse'));
  translatedTitle = translatedTitle.replace(/SUREKHA GAVLI'S HOUSE\(GAVLI MESS\)/g, t('surekhaGavlisHouse'));
  translatedTitle = translatedTitle.replace(/PANKAJ WAGHMARE'S HOUSE/g, t('pankajWaghmaresHouse'));
  translatedTitle = translatedTitle.replace(/SANJAY GANAPATI JADHAV'S HOUSE/g, t('sanjayGanapatiJadhavsHouse'));
  translatedTitle = translatedTitle.replace(/KIRAN KARAGJAR'S HOUSE/g, t('kiranKaragjarsHouse'));
  translatedTitle = translatedTitle.replace(/BADAM SALOKHE'S HOUSE/g, t('badamSalokhesHouse'));
  translatedTitle = translatedTitle.replace(/DIPAK CHOUGALE'S HOUSE/g, t('dipakChougalesHouse'));
  translatedTitle = translatedTitle.replace(/SWAMI SAMARTH HOUSE \(ROHIT RANJIT BENDARE\)/g, t('swamiSamarthHouse'));
  translatedTitle = translatedTitle.replace(/SURYAKANT SANGPAL HOUSE/g, t('suryakantSangpalHouse'));
  translatedTitle = translatedTitle.replace(/Trimurti House/g, t('trimurtiHouse'));
  translatedTitle = translatedTitle.replace(/Raosaheb Naik's House/g, t('raosahebNaiksHouse'));
  translatedTitle = translatedTitle.replace(/Alka Naik's House/g, t('alkaNaiksHouse'));
  translatedTitle = translatedTitle.replace(/Sanjay Kale's House/g, t('sanjayKalesHouse'));
  translatedTitle = translatedTitle.replace(/Jayshree Pardhi's House/g, t('jayshreePardhisHouse'));
  translatedTitle = translatedTitle.replace(/Vrushali Gadge's House/g, t('vrushaliGadgesHouse'));
  translatedTitle = translatedTitle.replace(/Sangita Mithari's House/g, t('sangitaMitharisHouse'));
  translatedTitle = translatedTitle.replace(/Disha Dilip Kadam's House/g, t('dishaDilipKadamsHouse'));
  translatedTitle = translatedTitle.replace(/Ujwala Teke's House/g, t('ujwalaTekesHouse'));
  translatedTitle = translatedTitle.replace(/Dilip Kadam's House/g, t('dilipKadamsHouse'));
  translatedTitle = translatedTitle.replace(/Kusum Mane's House/g, t('kusumManesHouse'));
  translatedTitle = translatedTitle.replace(/Seema Choughule's House/g, t('seemaChoughulesHouse'));
  translatedTitle = translatedTitle.replace(/Thorat's House/g, t('thoratsHouse'));
  translatedTitle = translatedTitle.replace(/Shridhar More's House/g, t('shridharMoresHouse'));
  translatedTitle = translatedTitle.replace(/Patankar's House/g, t('patankarsHouse'));
  translatedTitle = translatedTitle.replace(/Madhuri Sandip Desai's House/g, t('madhuriSandipDesaisHouse'));
  translatedTitle = translatedTitle.replace(/Anjana Mohite's House/g, t('anjanaMohitesHouse'));
  translatedTitle = translatedTitle.replace(/Mukund Bhat's House/g, t('mukundBhatsHouse'));
  return translatedTitle
};

const translateAddress = (address, t) => {
  if (!address) return address;

  let translatedAddress = address;

  // Translate common address patterns
  translatedAddress = translatedAddress.replace(/Salokhe Nagar/g, t('salokheNagar'));
  translatedAddress = translatedAddress.replace(/Salokhenagar/g, t('salokhenagar'));
  translatedAddress = translatedAddress.replace(/Kalamba/g, t('kalamba'));
  translatedAddress = translatedAddress.replace(/More Mane Nagar/g, t('moreManeNagar'));
  translatedAddress = translatedAddress.replace(/Prathamesh Nagar/g, t('prathameshNagar'));
  translatedAddress = translatedAddress.replace(/Shivganga Colony/g, t('shivgangaColony'));
  translatedAddress = translatedAddress.replace(/Kolhapur/g, t('kolhapur'));
  translatedAddress = translatedAddress.replace(/Maharashtra/g, t('maharashtra'));
  translatedAddress = translatedAddress.replace(/Survey Nagar/g, t('surveyNagar'));
  translatedAddress = translatedAddress.replace(/Klamaba/g, t('kalamba'));

  return translatedAddress;
};

const translateLocation = (location, t) => {
  if (!location) return location;

  let translatedLocation = location;

  // Translate distance measurements with proper fallback
  const translateDistance = (pattern, translationKey, t) => {
    const translation = t(translationKey);
    // If translation fails or returns the key itself, use the original pattern
    // Also check if the translation is actually a valid distance value
    if (translation && translation !== translationKey && translation.match(/^\d+[mkm]/)) {
      return translation;
    }
    // Fallback to original pattern if translation fails
    return pattern;
  };

  // Special handling for 450m to ensure it always works
  if (translatedLocation.includes('450m')) {
    const translation = t('fourHundredFiftyMeters');
    if (translation && translation !== 'fourHundredFiftyMeters') {
      translatedLocation = translatedLocation.replace(/450m/g, translation);
    }
  }

  translatedLocation = translatedLocation.replace(/50m/g, translateDistance('50m', 'fiftyMeters', t));
  translatedLocation = translatedLocation.replace(/150m/g, translateDistance('150m', 'hundredFiftyMeters', t));
  translatedLocation = translatedLocation.replace(/300m/g, translateDistance('300m', 'threeHundredMeters', t));
  translatedLocation = translatedLocation.replace(/320m/g, translateDistance('320m', 'threeHundredTwentyMeters', t));
  translatedLocation = translatedLocation.replace(/600m/g, translateDistance('600m', 'sixHundredMeters', t));
  translatedLocation = translatedLocation.replace(/72m/g, translateDistance('72m', 'seventyTwoMeters', t));
  translatedLocation = translatedLocation.replace(/70m/g, translateDistance('70m', 'seventyMeters', t));
  translatedLocation = translatedLocation.replace(/90m/g, translateDistance('90m', 'ninetyMeters', t));
  translatedLocation = translatedLocation.replace(/100m/g, translateDistance('100m', 'hundredMeters', t));
  translatedLocation = translatedLocation.replace(/110m/g, translateDistance('110m', 'hundredTenMeters', t));
  translatedLocation = translatedLocation.replace(/450m/g, translateDistance('450m', 'fourHundredFiftyMeters', t));
  translatedLocation = translatedLocation.replace(/900m/g, translateDistance('900m', 'nineHundredMeters', t));
  translatedLocation = translatedLocation.replace(/1\.5km/g, translateDistance('1.5km', 'onePointFiveKm', t));

  // Translate common location patterns
  translatedLocation = translatedLocation.replace(/away from College Gate/g, t('awayFromCollegeGate'));
  translatedLocation = translatedLocation.replace(/away from DYPSN College Gate/g, t('awayFromDYPSNCollegeGate'));
  translatedLocation = translatedLocation.replace(/Behind Canteen Mess/g, t('behindCanteenMess'));
  translatedLocation = translatedLocation.replace(/Infront of Mug Kirana Shop/g, t('infrontOfMugKirana'));
  translatedLocation = translatedLocation.replace(/Girls PG Area/g, t('girlsPGArea'));
  translatedLocation = translatedLocation.replace(/Near Trimurti House/g, t('nearTrimurtiHouse'));
  translatedLocation = translatedLocation.replace(/Near Karvir Chicken Shop/g, t('nearKarvirChicken'));
  translatedLocation = translatedLocation.replace(/Behind Gavli Mess/g, t('behindGavliMess'));
  translatedLocation = translatedLocation.replace(/Near GuruKrupa Mess/g, t('nearGuruKrupaMess'));
  translatedLocation = translatedLocation.replace(/Near Vimal Hospital/g, t('nearVimalHospital'));
  translatedLocation = translatedLocation.replace(/Near Kalamba Lake Waterfall/g, t('nearKalambaLakeWaterfall'));
  translatedLocation = translatedLocation.replace(/Infront Of Vijaya Canteen/g, t('infrontOfVijayaCanteen'));

  // Final safety check - ensure we never return empty or undefined
  if (!translatedLocation || translatedLocation.trim() === '') {
    console.warn('Translation resulted in empty location, using original:', location);
    return location;
  }

  return translatedLocation;
};

const translateRoomNote = (note, t) => {
  if (!note) return note;

  let translatedNote = note;

  // Translate common phrases
  translatedNote = translatedNote.replace(/without including light and water bill/g, t('withoutIncludingLightWater'));
  translatedNote = translatedNote.replace(/Including light and water bill/g, t('includingLightWater'));
  translatedNote = translatedNote.replace(/2\/3 Students can stay in this 1RK\./g, `2/3 ${t('studentsCanStay')} 1RK.`);
  translatedNote = translatedNote.replace(/2 Boys can stay in this room/g, `2 ${t('boysCanStay')}`);
  translatedNote = translatedNote.replace(/2\/3 girls can stay in this room\./g, `2/3 ${t('girlsCanStay')}`);
  translatedNote = translatedNote.replace(/1 girl can stay in this room\./g, `1 ${t('girlCanStay')}`);
  translatedNote = translatedNote.replace(/4\/5 GIRLS can stay in this room\./g, `4/5 ${t('girlsCanStayPlural')}`);
  translatedNote = translatedNote.replace(/4\/3 boys can stay in this room\./g, `4/3 ${t('boysCanStayPlural')}`);
  translatedNote = translatedNote.replace(/4\/5 boys can stay in this room\./g, `4/5 ${t('boysCanStayPlural')}`);
  translatedNote = translatedNote.replace(/5 GIRLS can stay in this room\./g, `5 ${t('girlsCanStayPlural')}`);
  translatedNote = translatedNote.replace(/4\/5 GIRLS can stay in this room\./g, `4/5 ${t('girlsCanStayPlural')}`);

  // Add translation for STUDENT'S addhar card pattern
  translatedNote = translatedNote.replace(/STUDENT'S addhar card, photo and parent phone number is mandatory/g, t('studentAddharPhotoParentMandatory'));

  return translatedNote;
};

const translateRoomDescription = (description, t) => {
  if (!description) return description;

  let translatedDescription = description;

  // Translate common phrases in descriptions
  translatedDescription = translatedDescription.replace(/5000 Rs\. Advance/g, `5000 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/1000 Rs\. Deposite/g, `1000 ${t('depositRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/1700 Rs\. Advance/g, `1700 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/3000 Rs\. Advance/g, `3000 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/1500 Rs\. Advance/g, `1500 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/2000 Rs\. Advance/g, `2000 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/1 YEAR AGREEMENT/g, t('yearAgreement'));
  translatedDescription = translatedDescription.replace(/The rent should be paid between the 1st and 10th of each month/g, t('rentPaymentBetween1st10th'));
  translatedDescription = translatedDescription.replace(/After 10pm no entry/g, t('after10pmNoEntry'));
  translatedDescription = translatedDescription.replace(/After 11pm no entry/g, t('after11pmNoEntry'));
  translatedDescription = translatedDescription.replace(/After 09:30 pm no entry/g, t('after930pmNoEntry'));
  translatedDescription = translatedDescription.replace(/Friends are not allowed in room/g, t('friendsNotAllowedInRoom'));
  translatedDescription = translatedDescription.replace(/Only Praents Allowed in room except brother/g, t('onlyParentsAllowed'));
  translatedDescription = translatedDescription.replace(/addhar card and photo of student is mandatory/g, t('aadharCardPhoto'));
  translatedDescription = translatedDescription.replace(/addhar car and student photo is mandatory/g, t('aadharCardPhoto'));
  translatedDescription = translatedDescription.replace(/STUDENTS'S addhar card, photo and parent phone number is mandatory\./g, t('studentAadharPhotoParentMandatory'));
  translatedDescription = translatedDescription.replace(/STUDENT'S addhar card, photo and parent phone number is mandatory/g, t('studentAddharPhotoParentMandatory'));
  translatedDescription = translatedDescription.replace(/addhar card and student photo and parent phone number is mandatory/g, t('aadharCardPhotoParentMandatory'));
  translatedDescription = translatedDescription.replace(/Self Cleaning/g, t('selfCleaning'));
  translatedDescription = translatedDescription.replace(/Self cooking not allowed/g, t('selfCookingNotAllowedNote'));
  translatedDescription = translatedDescription.replace(/Self cooking allowed/g, t('selfCookingAllowed'));
  translatedDescription = translatedDescription.replace(/If some damage happen in room by Student then they have to pay for that/g, t('damagePaymentNote'));
  translatedDescription = translatedDescription.replace(/Entry gate locked/g, t('entryGateLocked'));
  translatedDescription = translatedDescription.replace(/Self cooking not allowed/g, t('selfCookingNotAllowedNote'));
  translatedDescription = translatedDescription.replace(/Self cooking allowed/g, t('selfCookingAllowed'));
  translatedDescription = translatedDescription.replace(/Self Cooking not allowed/g, t('selfCookingNotAllowedNote'));
  translatedDescription = translatedDescription.replace(/Self Cooking allowed/g, t('selfCookingAllowed'));
  translatedDescription = translatedDescription.replace(/Self cleaning/g, t('selfCleaning'));
  translatedDescription = translatedDescription.replace(/2 Boys can stay in this room/g, t('twoBoysCanStay'));
  translatedDescription = translatedDescription.replace(/Gas Geyser Cylinder Should Refill by students/g, t('gasGeyserCylinderRefill'));
  translatedDescription = translatedDescription.replace(/Student Addhar card/g, t('studentAadharCard'));
  translatedDescription = translatedDescription.replace(/photo and paraent phone number is mandatory/g, t('photoAndParentPhoneMandatory'));

  // Additional missing patterns
  translatedDescription = translatedDescription.replace(/No drinking and smoking allowed in room/g, t('noDrinkingSmoking'));
  translatedDescription = translatedDescription.replace(/Good Behaviour is required/g, t('goodBehaviourRequired'));
  translatedDescription = translatedDescription.replace(/Garbage Management by students/g, t('garbageManagementByStudents'));
  translatedDescription = translatedDescription.replace(/Group Studies are not allowed/g, t('groupStudiesNotAllowed'));
  translatedDescription = translatedDescription.replace(/If there are three student in room then the electricity and water bill will be paid by students/g, t('electricityWaterBillByStudents'));
  translatedDescription = translatedDescription.replace(/Only Laptop and Mobile Charging is allowed/g, t('onlyLaptopMobileCharging'));
  translatedDescription = translatedDescription.replace(/Hairdryer and other electronics is not allowed/g, t('hairdryerElectronicsNotAllowed'));
  translatedDescription = translatedDescription.replace(/dedicated space for washing cloth/g, t('dedicatedWashingSpace'));
  translatedDescription = translatedDescription.replace(/Stairs with Auto Light Sensor/g, t('stairsAutoLightSensor'));
  translatedDescription = translatedDescription.replace(/Electric Induction for Cooking/g, t('electricInductionCooking'));
  translatedDescription = translatedDescription.replace(/New Rooms/g, t('newRooms'));
  translatedDescription = translatedDescription.replace(/Owner's Mess/g, t('ownerMess'));

  return translatedDescription;
};

const translateFeature = (feature, t) => {
  const featureMap = {
    'GAS GEYSER': t('gasGeyser'),
    'WIFI': t('wifi'),
    'WATER SUPPLY': t('waterSupply'),
    'Charging Bulb for electricity issue': t('chargingBulbForElectricityIssue'),
    'PARKING': t('parking'),
    'Study Table for Students': t('studyTable'),
    '3 CHAIRS FOR STUDENTS': t('chairsForStudents'),
    'MESS IN NEIGHBOUR HOUSE': t('messInNeighbour'),
    'TERRACE ACCESS': t('terraceAccess'),
    'Hot Water': t('hotWater'),
    'Cubert': t('cubert'),
    'Basic furniture': t('basicFurniture'),
    'NEAR BY MESS': t('nearByMess'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parents allowed for stay': t('parentsAllowedStay'),
    'Garbage Management by owner': t('garbageManagement'),
    'Solar Panel': t('solarPanel'),
    'Cloth Drying Area': t('clothDryingArea'),
    'CCTV CAMERA': t('cctvCamera'),
    'SECURITY': t('security'),
    'LADY DOCTOR SUPPORT': t('ladyDoctorSupport'),
    'Water Jar Provided for Drinking Water': t('waterJarProvided'),
    'Market Accessible': t('marketAccessible'),
    'Gas Geyser Cylinder Should Refill by students': t('gasGeyserCylinder'),
    '3 Floor buliding': t('threeFloorBuilding'),
    'CCTV CAMERA': t('cctvCamera'),
    'SECURITY': t('security'),
    'BEDS': t('beds'),
    'CUBERT': t('cubert'),
    'LADY DOCTOR SUPPORT': t('ladyDoctorSupport'),
    'shoes stand': t('shoesStand'),
    'Grbage Mnagement by owner': t('garbageManagementByOwner'),
    'Parents allowed for stay': t('parentsAllowedForStay'),
    'Solar Panel': t('solarPanel'),
    'WIFI(If Student want they can have it by their own)': t('wifiIfStudentWant'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parents allowed for stay': t('parentsAllowedForStay'),
    'Water Jar Provided for Drinking Water': t('waterJarProvidedForDrinking'),
    'Market Accessible': t('marketAccessible'),
    'Mattress': t('mattress'),
    'Dressing Table': t('dressingTable'),
    'cloth Drying Space': t('clothDryingSpace'),
    'Charging Bulb for electricity issue': t('chargingBulbForElectricityIssue'),
    'Water Jar Provided for Drinking Water': t('waterJarProvidedForDrinkingWater'),
    'Market Accessible': t('marketAccessible'),
    'SELF COOKING ALLOW': t('selfCookingAllowed'),
    'OWNER HAVE MESS': t('ownerHaveMess'),
    'CHARGING BULB FOR ELECTRICITY ISSUE': t('chargingBulbForElectricityIssue'),
    'AQUA FILTRE': t('aquaFiltre'),
    'fOR LIGHT BILL SEPRATE METER': t('forLightBillSeparateMeter'),
    'SELF COOKING ALLOW': t('selfCookingAllowed'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI(If Student want they can have it by their own)': t('wifiIfStudentWant'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI': t('wifi'),
    'WATER SUPPLY': t('waterSupply'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI': t('wifi'),
    'WATER SUPPLY': t('waterSupply'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI(If Student want they can have it by their own)': t('wifiIfStudentWant'),
    'WATER SUPPLY': t('waterSupply'),
    'SELF COOKING ALLOW': t('selfCookingAllowed'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI': t('wifi'),
    'WATER SUPPLY': t('waterSupply'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'OWNER HAVE MESS': t('ownerHaveMess'),
    'SELF COOKING  ALLOW': t('selfCookingAllowed'),
    'fOR LIGHT BILL SEPRATE METER': t('forLightBillSeparateMeter'),
    'CHARGING BULB FOR ELECTRICITY ISSUE': t('chargingBulbForELECTRICITYtIssue'),
    'AQUA FILTRE': t('aquaFiltre'),
    'Cloth Drying Area': t('clothDryingArea'),
    'CCTV CAMERA': t('cctvCamera'),
    'SECURITY': t('security'),
    'LADY DOCTOR SUPPORT': t('ladyDoctorSupport'),
    'shoes stand': t('shoesStand'),
    'Grbage Mnagement by owner': t('garbageManagementByOwner'),
    'Parents allowed for stay': t('parentsAllowedForStay'),
    'Solar Panel': t('solarPanel'),
    'WIFI(If Student want they can have it by their own)': t('wifiIfStudentWant'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'Water Jar Provided for Drinking Water': t('waterJarProvidedForDrinking'),
    'Market Accessible': t('marketAccessible'),
    'Mattress': t('mattress'),
    'Dressing Table': t('dressingTable'),
    'cloth Drying Space': t('clothDryingSpace'),
    'Charging Bulb for electricity issue': t('chargingBulbFoElectricityIssue'),
    'Water Jar Provided for Drinking Water': t('waterJarProvidedForDrinkingWater'),
    'Market Accessible': t('marketAccessible')
  };

  return featureMap[feature] || feature;
};

const translateRoomType = (roomType, t) => {
  const roomTypeMap = {
    'Single Room': t('singleRoom'),
    '1 RK': t('oneRK'),
    '1 RK & 1 Hall': t('oneRKAndHall'),
    '1 RK & 1RK': t('oneRKAndOneRK'),
    'Cot Basis': t('cotBasis'),
    '1 RK, 1RK & 1 Hall': t('oneRKAndHall'),
    '1 RK, 1RK & 1 Hall': t('oneRKAndHall')
  };

  return roomTypeMap[roomType] || roomType;
};
