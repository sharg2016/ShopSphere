import 'dotenv/config';
import dns from 'dns';
import mongoose from 'mongoose';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore
}
dns.setDefaultResultOrder('ipv4first');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsphere';

const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    brandName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0, index: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

ProductSchema.index({ category: 1, rating: 1 })

const Product = mongoose.model('Product', ProductSchema);

const sampleProducts = [
    {
        "productId": "CAM-001",
        "name": "Sony Alpha a7 IV Mirrorless Camera",
        "category": "Camera",
        "brandName": "Sony",
        "price": 2499,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Full-frame 33MP sensor, 4K 60p video recording, advanced real-time AF system."
    },
    {
        "productId": "CAM-002",
        "name": "Canon EOS R6 Mark II",
        "category": "Camera",
        "brandName": "Canon",
        "price": 2299,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "24.2MP CMOS Sensor, 40 fps continuous shooting, Dual Pixel CMOS AF II."
    },
    {
        "productId": "CAM-003",
        "name": "Fujifilm X-T5 Mirrorless Camera",
        "category": "Camera",
        "brandName": "Fujifilm",
        "price": 1699,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1512790182412-b19e6d61b397?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "40MP X-Trans CMOS 5 HR sensor, 3-way tilting LCD, 7-stop in-body stabilization."
    },
    {
        "productId": "CAM-004",
        "name": "Nikon Z7 II FX-Format Mirrorless Camera",
        "category": "Camera",
        "brandName": "Nikon",
        "price": 2999,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "45.7MP high-resolution sensor, dual EXPROCESSING engines, 4K UHD video capability."
    },
    {
        "productId": "CAM-005",
        "name": "Sony FX3 Full-Frame Cinema Line Camera",
        "category": "Camera",
        "brandName": "Sony",
        "price": 3899,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1500634245200-e524fc67504e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Designed for cinematic content creation, active cooling fan, S-Cinetone profile."
    },
    {
        "productId": "CAM-006",
        "name": "Canon EOS R5 Full-Frame Mirrorless",
        "category": "Camera",
        "brandName": "Canon",
        "price": 3899,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "45MP resolution, 8K raw video recording, 5-axis image stabilization."
    },
    {
        "productId": "CAM-007",
        "name": "Fujifilm GFX 100S Medium Format Camera",
        "category": "Camera",
        "brandName": "Fujifilm",
        "price": 5999,
        "rating": 4.95,
        "image": "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "102MP medium format sensor, compact body structure, incredible dynamic range."
    },
    {
        "productId": "CAM-008",
        "name": "Nikon Z8 Mirrorless Camera",
        "category": "Camera",
        "brandName": "Nikon",
        "price": 3999,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Stacked 45.7MP sensor, blackout-free EVF, 8K 30p internal video recording."
    },
    {
        "productId": "CAM-009",
        "name": "Sony Alpha 1 High-Resolution Camera",
        "category": "Camera",
        "brandName": "Sony",
        "price": 6498,
        "rating": 4.98,
        "image": "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "50.1MP full-frame stacked sensor, 30fps continuous burst, 8K video support."
    },
    {
        "productId": "CAM-010",
        "name": "Panasonic Lumix GH6 Mirrorless Camera",
        "category": "Camera",
        "brandName": "Panasonic",
        "price": 1797,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1520390138845-fd2d229dd552?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Micro Four Thirds sensor, Apple ProRes internal recording, unlimited 4K 60p."
    },
    {
        "productId": "CAM-011",
        "name": "Canon EOS 5D Mark IV DSLR Camera",
        "category": "Camera",
        "brandName": "Canon",
        "price": 2499,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Legendary full-frame DSLR, 30.4MP sensor, DCI 4K video, robust weather sealing."
    },
    {
        "productId": "CAM-012",
        "name": "Nikon D850 FX-Format Digital SLR",
        "category": "Camera",
        "brandName": "Nikon",
        "price": 2796,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1508873696983-2df5c920ac2c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "45.7MP backside illuminated sensor, 9fps with battery grip, tilt touch screen."
    },
    {
        "productId": "CAM-013",
        "name": "Sony Alpha 7R V Mirrorless Camera",
        "category": "Camera",
        "brandName": "Sony",
        "price": 3898,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AI processing unit for advanced subject recognition, 61MP resolution, 8K video."
    },
    {
        "productId": "CAM-014",
        "name": "Fujifilm X100V Compact Digital Camera",
        "category": "Camera",
        "brandName": "Fujifilm",
        "price": 1399,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1495714080277-3e13d8036574?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "26.1MP X-Trans CMOS 4, 23mm f/2 lens, advanced hybrid viewfinder."
    },
    {
        "productId": "CAM-015",
        "name": "Leica Q2 Full-Frame Compact Camera",
        "category": "Camera",
        "brandName": "Leica",
        "price": 5795,
        "rating": 4.92,
        "image": "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "47.3MP full-frame sensor, Summilux 28mm f/1.7 ASPH lens, weather-sealed design."
    },
    {
        "productId": "CAM-016",
        "name": "Olympus OM-D E-M1 Mark III",
        "category": "Camera",
        "brandName": "OM System",
        "price": 1599,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1533107862482-0e6974b06f4c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "20.4MP Live MOS micro four thirds sensor, handheld high-res shot, 7.5 shutter stops."
    },
    {
        "productId": "CAM-017",
        "name": "Panasonic Lumix S5 II Mirrorless Camera",
        "category": "Camera",
        "brandName": "Panasonic",
        "price": 1997,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1500634245200-e524fc67504e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Phase hybrid AF system, 24.2MP full-frame sensor, active cooling structure."
    },
    {
        "productId": "CAM-018",
        "name": "Canon EOS R8 Lightweight Mirrorless",
        "category": "Camera",
        "brandName": "Canon",
        "price": 1499,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Full-frame performance in a compact body, 24.2MP, 40fps electronic shutter speed."
    },
    {
        "productId": "CAM-019",
        "name": "Sony ZV-E10 Vlogging Camera",
        "category": "Camera",
        "brandName": "Sony",
        "price": 698,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Interchangeable lens vlogging camera, 24.2MP APS-C sensor, directional 3-capsule mic."
    },
    {
        "productId": "CAM-020",
        "name": "Nikon Z fc Retro-Style Mirrorless Camera",
        "category": "Camera",
        "brandName": "Nikon",
        "price": 959,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1512790182412-b19e6d61b397?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Classic FM2-inspired physical dials, 20.9MP DX-format sensor, vari-angle touch display."
    },
    {
        "productId": "CAM-021",
        "name": "Fujifilm X-T30 II Mirrorless Camera",
        "category": "Camera",
        "brandName": "Fujifilm",
        "price": 899,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "26.1MP APS-C X-Trans CMOS 4 sensor, fast autofocus, 18 film simulation modes."
    },
    {
        "productId": "CAM-022",
        "name": "Canon PowerShot G7 X Mark III",
        "category": "Camera",
        "brandName": "Canon",
        "price": 749,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "20.1MP 1-inch stacked CMOS sensor, 4.2x optical zoom lens, live streaming capabilities."
    },
    {
        "productId": "CAM-023",
        "name": "Sony Alpha 6700 APS-C Mirrorless",
        "category": "Camera",
        "brandName": "Sony",
        "price": 1398,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AI-based tracking, 26.0MP back-illuminated sensor, 4K video oversampled from 6K."
    },
    {
        "productId": "CAM-024",
        "name": "Panasonic Lumix TZ200 Travel Camera",
        "category": "Camera",
        "brandName": "Panasonic",
        "price": 799,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "1-inch sensor, 15x LEICA DC Vario-Elmar zoom lens, 4K photo and video modes."
    },
    {
        "productId": "CAM-025",
        "name": "Leica M11 Rangefinder Camera",
        "category": "Camera",
        "brandName": "Leica",
        "price": 8995,
        "rating": 4.93,
        "image": "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "60MP triple-resolution sensor, iconic rangefinder design, internal memory buffer."
    },
    {
        "productId": "CAM-026",
        "name": "Nikon Z50 DX-Format Mirrorless",
        "category": "Camera",
        "brandName": "Nikon",
        "price": 856,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1520390138845-fd2d229dd552?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "20.9MP DX sensor, lightweight magnesium alloy frame, flip-down screen for selfies."
    },
    {
        "productId": "CAM-027",
        "name": "Canon EOS 90D DSLR Camera",
        "category": "Camera",
        "brandName": "Canon",
        "price": 1199,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "32.5MP APS-C CMOS sensor, 10fps shooting rate, uncropped 4K 30p video execution."
    },
    {
        "productId": "CAM-028",
        "name": "Sony Cyber-shot RX100 VII",
        "category": "Camera",
        "brandName": "Sony",
        "price": 1298,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1508873696983-2df5c920ac2c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "20.1MP 1-inch stacked CMOS sensor, 24-200mm equivalent zoom lens, lightning-fast AF."
    },
    {
        "productId": "CAM-029",
        "name": "Fujifilm GFX 50S II Medium Format",
        "category": "Camera",
        "brandName": "Fujifilm",
        "price": 3999,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "51.4MP large format sensor, powerful stabilization, exceptional color depth profiling."
    },
    {
        "productId": "CAM-030",
        "name": "Ricoh GR III Street Edition",
        "category": "Camera",
        "brandName": "Ricoh",
        "price": 999,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1495714080277-3e13d8036574?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Pocket-sized APS-C powerhouse, 24MP sensor, snap focus mode for street shooting."
    },
    {
        "productId": "CAM-031",
        "name": "Panasonic Lumix S1H Full-Frame Cinema",
        "category": "Camera",
        "brandName": "Panasonic",
        "price": 3497,
        "rating": 4.89,
        "image": "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Netflix-approved cinema camera, 24.2MP sensor, 6K video recording, dual native ISO."
    },
    {
        "productId": "CAM-032",
        "name": "Canon EOS R10 Entry-Level Mirrorless",
        "category": "Camera",
        "brandName": "Canon",
        "price": 979,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1533107862482-0e6974b06f4c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "24.2MP APS-C CMOS sensor, 23fps continuous shooting, EOS iTR AF X tracking."
    },
    {
        "productId": "CAM-033",
        "name": "Nikon Z6 II Versatile Mirrorless",
        "category": "Camera",
        "brandName": "Nikon",
        "price": 1996,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dual EXPEED processors, 24.5MP BSI sensor, 14fps continuous capture performance."
    },
    {
        "productId": "CAM-034",
        "name": "Sony Alpha 7C II Compact Full-Frame",
        "category": "Camera",
        "brandName": "Sony",
        "price": 2198,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact form factor with 33MP full-frame sensor, dedicated AI chip, 7-step stabilization."
    },
    {
        "productId": "CAM-035",
        "name": "Fujifilm X-H2S Flagship APS-C Camera",
        "category": "Camera",
        "brandName": "Fujifilm",
        "price": 1999,
        "rating": 4.87,
        "image": "https://images.unsplash.com/photo-1512790182412-b19e6d61b397?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Stacked 26.1MP X-Trans HS sensor, 40fps blackout-free shooting, 6.2K 30p open gate."
    },
    {
        "productId": "CAM-036",
        "name": "Canon EOS Rebel T7 DSLR Camera",
        "category": "Camera",
        "brandName": "Canon",
        "price": 479,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "24.1MP APS-C sensor, built-in Wi-Fi connectivity, perfect beginner-friendly ecosystem."
    },
    {
        "productId": "CAM-037",
        "name": "Nikon D3500 DSLR Body with Lens",
        "category": "Camera",
        "brandName": "Nikon",
        "price": 499,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "24.2MP DX sensor, guide mode for new users, extended battery longevity profile."
    },
    {
        "productId": "CAM-038",
        "name": "Sony ZV-1 II Digital Camera for Creators",
        "category": "Camera",
        "brandName": "Sony",
        "price": 898,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Wide-angle 18-50mm zoom lens, 1-inch sensor, cinematic vlog settings, intelligent mic."
    },
    {
        "productId": "CAM-039",
        "name": "Panasonic Lumix G9 II Professional Mirrorless",
        "category": "Camera",
        "brandName": "Panasonic",
        "price": 1897,
        "rating": 4.78,
        "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Phase detection AF in MFT format, 25.2MP sensor, handheld high-res photo capture."
    },
    {
        "productId": "CAM-040",
        "name": "Olympus OM-1 Micro Four Thirds",
        "category": "Camera",
        "brandName": "OM System",
        "price": 2199,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Stacked BSI Live MOS sensor, cross-quad pixel phase detection, IP53 weather resistance."
    },
    {
        "productId": "CAM-041",
        "name": "Canon EOS RP Full-Frame Mirrorless",
        "category": "Camera",
        "brandName": "Canon",
        "price": 999,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1520390138845-fd2d229dd552?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Lightweight full-frame body, 26.2MP CMOS sensor, Dual Pixel CMOS AF technology."
    },
    {
        "productId": "CAM-042",
        "name": "Sony Alpha 7 III Entry Full-Frame",
        "category": "Camera",
        "brandName": "Sony",
        "price": 1698,
        "rating": 4.82,
        "image": "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "24.2MP back-illuminated sensor, 10fps performance, industry-leading battery stamina."
    },
    {
        "productId": "CAM-043",
        "name": "Fujifilm X-T200 Mirrorless Camera",
        "category": "Camera",
        "brandName": "Fujifilm",
        "price": 699,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1508873696983-2df5c920ac2c?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "24.2MP APS-C sensor, large widescreen touch display, smart face detection autofocus."
    },
    {
        "productId": "CAM-044",
        "name": "Nikon Z30 Content Creator Mirrorless",
        "category": "Camera",
        "brandName": "Nikon",
        "price": 709,
        "rating": 4.58,
        "image": "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Purpose-built for video bloggers, 20.9MP sensor, clear stereo sound capture layout."
    },
    {
        "productId": "CAM-045",
        "name": "Canon PowerShot SX740 HS",
        "category": "Camera",
        "brandName": "Canon",
        "price": 399,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1495714080277-3e13d8036574?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "40x optical zoom travel pocket camera, 20.3MP sensor, 4K video recording capability."
    },
    {
        "productId": "CAM-046",
        "name": "Sony Alpha 9 II Professional Sports",
        "category": "Camera",
        "brandName": "Sony",
        "price": 4498,
        "rating": 4.91,
        "image": "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "24.2MP stacked CMOS sensor, 20fps blackout-free shooting, high-speed ethernet built-in."
    },
    {
        "productId": "CAM-047",
        "name": "Leica M10-R Rangefinder Camera",
        "category": "Camera",
        "brandName": "Leica",
        "price": 8295,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1533107862482-0e6974b06f4c?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "40MP high-resolution sensor, ultra-quiet shutter mechanism, exceptional low-light behavior."
    },
    {
        "productId": "CAM-048",
        "name": "Fujifilm Instax Mini Evo Hybrid",
        "category": "Camera",
        "brandName": "Fujifilm",
        "price": 199,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Hybrid instant film camera, 10 lens effects and 10 film effects combinations via LCD screen."
    },
    {
        "productId": "CAM-049",
        "name": "Panasonic Lumix FZ1000 II Bridge Camera",
        "category": "Camera",
        "brandName": "Panasonic",
        "price": 797,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "1-inch 20.1MP sensor, 16x Leica DC Vario-Elmar zoom lens, 4K video recording suite."
    },
    {
        "productId": "CAM-050",
        "name": "Canon EOS R3 Full-Frame Sports Camera",
        "category": "Camera",
        "brandName": "Canon",
        "price": 5999,
        "rating": 4.96,
        "image": "https://images.unsplash.com/photo-1512790182412-b19e6d61b397?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Eye-control autofocus technology, 24.1MP stacked back-illuminated sensor, 30fps burst rate."
    },
    {
        "productId": "LAP-001",
        "name": "MacBook Pro 16-inch M3 Max",
        "category": "Laptop",
        "brandName": "Apple",
        "price": 3499,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Apple M3 Max chip with 16-core CPU, 40-core GPU, 36GB Unified Memory, Liquid Retina XDR display."
    },
    {
        "productId": "LAP-002",
        "name": "Dell XPS 15 9530 Laptop",
        "category": "Laptop",
        "brandName": "Dell",
        "price": 1999,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i9-13900H, NVIDIA RTX 4060, 3.5K OLED Touch Display, 32GB DDR5 RAM."
    },
    {
        "productId": "LAP-003",
        "name": "Lenovo ThinkPad X1 Carbon Gen 11",
        "category": "Laptop",
        "brandName": "Lenovo",
        "price": 1649,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i7-1355U, 16GB RAM, 512GB SSD, 14-inch WUXGA display, lightweight business ultrabook."
    },
    {
        "productId": "LAP-004",
        "name": "ASUS ROG Zephyrus G14 Gaming Laptop",
        "category": "Laptop",
        "brandName": "ASUS",
        "price": 1599,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 9 7940HS, NVIDIA RTX 4070, 16GB DDR5, 1TB PCIe SSD, 165Hz Nebula Display."
    },
    {
        "productId": "LAP-005",
        "name": "HP Spectre x360 14 Convertible Laptop",
        "category": "Laptop",
        "brandName": "HP",
        "price": 1399,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i7-1355U, 16GB RAM, 1TB SSD, 3K2K OLED touch screen, active pen included."
    },
    {
        "productId": "LAP-006",
        "name": "Microsoft Surface Laptop 5",
        "category": "Laptop",
        "brandName": "Microsoft",
        "price": 1299,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "13.5-inch PixelSense display, Intel Core i5, 8GB RAM, 512GB SSD, platinum finish."
    },
    {
        "productId": "LAP-007",
        "name": "Apple MacBook Air 15-inch M2",
        "category": "Laptop",
        "brandName": "Apple",
        "price": 1299,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Apple M2 chip with 8-core CPU and 10-core GPU, 8GB Unified Memory, 256GB SSD storage."
    },
    {
        "productId": "LAP-008",
        "name": "Razer Blade 16 Gaming Laptop",
        "category": "Laptop",
        "brandName": "Razer",
        "price": 2999,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dual-mode Mini-LED display, Intel i9-13950HX, NVIDIA RTX 4080, 32GB RAM, 1TB SSD."
    },
    {
        "productId": "LAP-009",
        "name": "Acer Swift Go 14 OLED Laptop",
        "category": "Laptop",
        "brandName": "Acer",
        "price": 849,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 7 7840U, 16GB LPDDR5X, 512GB SSD, 14-inch 2.8K OLED 90Hz display."
    },
    {
        "productId": "LAP-010",
        "name": "MSI Raider GE78 HX Gaming Laptop",
        "category": "Laptop",
        "brandName": "MSI",
        "price": 2799,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i9-13980HX, NVIDIA RTX 4070, 32GB DDR5, 2TB NVMe SSD, 240Hz QHD+ screen."
    },
    {
        "productId": "LAP-011",
        "name": "ASUS Zenbook 14 OLED",
        "category": "Laptop",
        "brandName": "ASUS",
        "price": 999,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i7-1360P, 16GB RAM, 512GB SSD, slim profile, gorgeous 90Hz OLED panel."
    },
    {
        "productId": "LAP-012",
        "name": "Dell Inspiron 16 7630",
        "category": "Laptop",
        "brandName": "Dell",
        "price": 1099,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "16-inch 16:10 display, Intel Core i7-13700H, 16GB RAM, 1TB SSD storage execution."
    },
    {
        "productId": "LAP-013",
        "name": "Lenovo Legion Pro 7i Gen 8",
        "category": "Laptop",
        "brandName": "Lenovo",
        "price": 2299,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i9-13900HX, RTX 4080, 32GB RAM, 1TB SSD, coldfront cooling technology."
    },
    {
        "productId": "LAP-014",
        "name": "HP Pavilion x360 2-in-1",
        "category": "Laptop",
        "brandName": "HP",
        "price": 679,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i5-1335U, 8GB RAM, 256GB SSD, 14-inch touchscreen flip display."
    },
    {
        "productId": "LAP-015",
        "name": "Apple MacBook Pro 14-inch M3 Pro",
        "category": "Laptop",
        "brandName": "Apple",
        "price": 1999,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "M3 Pro chip with 11-core CPU, 14-core GPU, 18GB Unified Memory, 512GB SSD storage."
    },
    {
        "productId": "LAP-016",
        "name": "Microsoft Surface Pro 9",
        "category": "Laptop",
        "brandName": "Microsoft",
        "price": 1099,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Evo 12th Gen i5, 8GB RAM, 256GB SSD, versatile 2-in-1 tablet form factor."
    },
    {
        "productId": "LAP-017",
        "name": "Acer Predator Helios 16",
        "category": "Laptop",
        "brandName": "Acer",
        "price": 1799,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i7-13700HX, RTX 4070, 16GB DDR5, 16-inch 2560x1600 240Hz IPS screen."
    },
    {
        "productId": "LAP-018",
        "name": "ASUS TUF Gaming A15",
        "category": "Laptop",
        "brandName": "ASUS",
        "price": 1099,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 7 7735HS, NVIDIA RTX 4060, 16GB RAM, 512GB SSD, military-grade durability."
    },
    {
        "productId": "LAP-019",
        "name": "Samsung Galaxy Book3 Ultra",
        "category": "Laptop",
        "brandName": "Samsung",
        "price": 2399,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "16-inch Dynamic AMOLED 2X display, Core i7-13700H, RTX 4050, 16GB RAM, 1TB SSD."
    },
    {
        "productId": "LAP-020",
        "name": "Gigabyte G5 Gaming Laptop",
        "category": "Laptop",
        "brandName": "Gigabyte",
        "price": 899,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i5-12500H, RTX 4060, 16GB RAM, 512GB SSD, 144Hz FHD screen."
    },
    {
        "productId": "LAP-021",
        "name": "LG Gram 17 Lightweight Laptop",
        "category": "Laptop",
        "brandName": "LG",
        "price": 1599,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Incredibly lightweight at under 3 lbs, 17-inch IPS WQXGA display, Intel i7, 16GB RAM."
    },
    {
        "productId": "LAP-022",
        "name": "Dell Alienware m16 Gaming Laptop",
        "category": "Laptop",
        "brandName": "Dell",
        "price": 2199,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 7 7845HX, NVIDIA RTX 4070, 32GB RAM, 1TB SSD, 165Hz QHD+ panel."
    },
    {
        "productId": "LAP-023",
        "name": "Lenovo Yoga 7i Gen 8",
        "category": "Laptop",
        "brandName": "Lenovo",
        "price": 949,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "14-inch 2.2K IPS touchscreen, Intel Core i5-1335U, 16GB RAM, 512GB SSD storage."
    },
    {
        "productId": "LAP-024",
        "name": "HP Envy x360 15",
        "category": "Laptop",
        "brandName": "HP",
        "price": 899,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 5 7530U, 16GB RAM, 512GB SSD, 15.6-inch FHD touch screen flexibility."
    },
    {
        "productId": "LAP-025",
        "name": "Apple MacBook Air 13-inch M1",
        "category": "Laptop",
        "brandName": "Apple",
        "price": 999,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Apple M1 chip, 8GB RAM, 256GB SSD storage, fanless silent design, Retina display."
    },
    {
        "productId": "LAP-026",
        "name": "ASUS Vivobook Go 15",
        "category": "Laptop",
        "brandName": "ASUS",
        "price": 399,
        "rating": 4.0,
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 3 7320U, 8GB RAM, 128GB UFS storage, 15.6-inch FHD clear display."
    },
    {
        "productId": "LAP-027",
        "name": "Acer Aspire 3 Slim Laptop",
        "category": "Laptop",
        "brandName": "Acer",
        "price": 349,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i3-N305, 8GB LPDDR5, 128GB NVMe SSD, everyday multitasking build."
    },
    {
        "productId": "LAP-028",
        "name": "MSI Modern 14 Business Laptop",
        "category": "Laptop",
        "brandName": "MSI",
        "price": 599,
        "rating": 4.25,
        "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i5-1235U, 16GB RAM, 512GB SSD, classic black professional finish."
    },
    {
        "productId": "LAP-029",
        "name": "Framework Laptop 13",
        "category": "Laptop",
        "brandName": "Framework",
        "price": 1049,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Fully modular and repairable design, Intel Core i5-1340P, customizable expansion ports."
    },
    {
        "productId": "LAP-030",
        "name": "System76 Lemur Pro Linux Laptop",
        "category": "Laptop",
        "brandName": "System76",
        "price": 1299,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Pop!_OS pre-installed, Intel Core i7, magnesium chassis, up to 14 hours battery."
    },
    {
        "productId": "LAP-031",
        "name": "Razer Blade 14 Gaming Laptop",
        "category": "Laptop",
        "brandName": "Razer",
        "price": 2399,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 9 7940HS, NVIDIA RTX 4070, 16GB RAM, 1TB SSD, 240Hz QHD+ display."
    },
    {
        "productId": "LAP-032",
        "name": "Dell Latitude 5540 Enterprise",
        "category": "Laptop",
        "brandName": "Dell",
        "price": 1429,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i7-1365U vPro, 16GB RAM, 512GB SSD, robust corporate security specs."
    },
    {
        "productId": "LAP-033",
        "name": "Lenovo IdeaPad 3i Budget Laptop",
        "category": "Laptop",
        "brandName": "Lenovo",
        "price": 429,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "15.6-inch HD touch display, Intel Core i3-1115G4, 8GB RAM, 256GB SSD storage."
    },
    {
        "productId": "LAP-034",
        "name": "HP Omen 16 Gaming Laptop",
        "category": "Laptop",
        "brandName": "HP",
        "price": 1449,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 7 7840HS, NVIDIA RTX 4060, 16GB RAM, 512GB SSD, 165Hz fast response screen."
    },
    {
        "productId": "LAP-035",
        "name": "ASUS ROG Strix Scar 18",
        "category": "Laptop",
        "brandName": "ASUS",
        "price": 3299,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Massive 18-inch 240Hz Nebula HDR display, Intel i9-13980HX, RTX 4090, 32GB RAM."
    },
    {
        "productId": "LAP-036",
        "name": "Apple MacBook Pro 16-inch M3 Pro",
        "category": "Laptop",
        "brandName": "Apple",
        "price": 2499,
        "rating": 4.92,
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "M3 Pro chip with 12-core CPU, 18-core GPU, 18GB Unified Memory, 512GB SSD storage."
    },
    {
        "productId": "LAP-037",
        "name": "Acer Chromebook Spin 714",
        "category": "Laptop",
        "brandName": "Acer",
        "price": 699,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "ChromeOS convertible, Intel Core i5-1335U, 8GB RAM, 256GB SSD, 14-inch 16:10 WUXGA display."
    },
    {
        "productId": "LAP-038",
        "name": "MSI Katana 15 Gaming Laptop",
        "category": "Laptop",
        "brandName": "MSI",
        "price": 1149,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i7-13620H, RTX 4070, 16GB DDR5, 1TB NVMe SSD, 4-zone RGB gaming keyboard."
    },
    {
        "productId": "LAP-039",
        "name": "Lenovo ThinkPad E16 Business Laptop",
        "category": "Laptop",
        "brandName": "Lenovo",
        "price": 799,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 5 7530U, 16GB RAM, 512GB SSD, reliable numeric keypad and enterprise security."
    },
    {
        "productId": "LAP-040",
        "name": "HP ProBook 440 G10",
        "category": "Laptop",
        "brandName": "HP",
        "price": 849,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i5-1335U, 16GB RAM, 256GB SSD, commercial-grade durability and battery life."
    },
    {
        "productId": "LAP-041",
        "name": "Microsoft Surface Laptop Studio 2",
        "category": "Laptop",
        "brandName": "Microsoft",
        "price": 2399,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dynamic pull-forward touchscreen, Intel Core i7, NVIDIA RTX 4060, 32GB RAM, 1TB SSD."
    },
    {
        "productId": "LAP-042",
        "name": "Dell Precision 3580 Workstation",
        "category": "Laptop",
        "brandName": "Dell",
        "price": 1749,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core i7-1355U, NVIDIA RTX A500 graphics, 16GB RAM, 512GB SSD for CAD and 3D work."
    },
    {
        "productId": "LAP-043",
        "name": "ASUS Zenbook Pro 16X OLED",
        "category": "Laptop",
        "brandName": "ASUS",
        "price": 2599,
        "rating": 4.82,
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Auto-tilting keyboard mechanism, Intel i9, RTX 4080, 32GB RAM, 4K OLED touch display."
    },
    {
        "productId": "LAP-044",
        "name": "Acer Swift 3 Thin & Light",
        "category": "Laptop",
        "brandName": "Acer",
        "price": 649,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AMD Ryzen 7 5700U, 8GB RAM, 512GB SSD, 14-inch Full HD IPS screen design."
    },
    {
        "productId": "LAP-045",
        "name": "Samsung Galaxy Book4 Pro",
        "category": "Laptop",
        "brandName": "Samsung",
        "price": 1449,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Core Ultra 7 processor, 16GB RAM, 512GB SSD, 14-inch 3K AMOLED touch display."
    },
    {
        "productId": "LAP-046",
        "name": "Lenovo Yoga Book 9i Dual Screen",
        "category": "Laptop",
        "brandName": "Lenovo",
        "price": 1999,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "World's first dual full-size OLED screen laptop, Intel Core i7-1355U, 16GB RAM, 1TB SSD."
    },
    {
        "productId": "LAP-047",
        "name": "Razer Blade 18 Ultimate Desktop Replacement",
        "category": "Laptop",
        "brandName": "Razer",
        "price": 3899,
        "rating": 4.89,
        "image": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "18-inch QHD+ 240Hz display, Intel i9-13950HX, NVIDIA RTX 4090, 64GB RAM, 2TB SSD."
    },
    {
        "productId": "LAP-048",
        "name": "HP EliteBook 840 G10",
        "category": "Laptop",
        "brandName": "HP",
        "price": 1599,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Premium enterprise notebook, Intel Core i7-1355U, 16GB RAM, 512GB SSD, AI-based noise reduction."
    },
    {
        "productId": "LAP-049",
        "name": "ASUS ProArt StudioBook 16 OLED",
        "category": "Laptop",
        "brandName": "ASUS",
        "price": 2899,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Built for creative professionals, ASUS Dial pad, Intel i9, RTX 4070, 32GB RAM, 3.2K 120Hz OLED."
    },
    {
        "productId": "LAP-050",
        "name": "Apple MacBook Air 13-inch M3",
        "category": "Laptop",
        "brandName": "Apple",
        "price": 1099,
        "rating": 4.92,
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Apple M3 chip with 8-core CPU and 10-core GPU, 8GB Unified Memory, 256GB SSD storage, support for dual external displays."
    },
    {
        "productId": "PHN-001",
        "name": "iPhone 15 Pro Max 256GB",
        "category": "SmartPhone",
        "brandName": "Apple",
        "price": 1199,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Titanium design, A17 Pro chip, 5x Telephoto camera, Action button, USB-C port."
    },
    {
        "productId": "PHN-002",
        "name": "Samsung Galaxy S24 Ultra 512GB",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 1299,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Galaxy AI features, built-in S Pen, 200MP camera, Snapdragon 8 Gen 3."
    },
    {
        "productId": "PHN-003",
        "name": "Google Pixel 8 Pro 128GB",
        "category": "SmartPhone",
        "brandName": "Google",
        "price": 999,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Google Tensor G3 chip, advanced computational photography, Super Actua display, 7 years of updates."
    },
    {
        "productId": "PHN-004",
        "name": "OnePlus 12 5G 256GB",
        "category": "SmartPhone",
        "brandName": "OnePlus",
        "price": 799,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Snapdragon 8 Gen 3, Hasselblad Camera for Mobile, 5400mAh battery with 100W fast charging."
    },
    {
        "productId": "PHN-005",
        "name": "Xiaomi 14 Ultra 512GB",
        "category": "SmartPhone",
        "brandName": "Xiaomi",
        "price": 1099,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Leica quad camera system with 1-inch variable aperture sensor, Snapdragon 8 Gen 3, AMOLED display."
    },
    {
        "productId": "PHN-006",
        "name": "Sony Xperia 1 V Gaming & Creator Phone",
        "category": "SmartPhone",
        "brandName": "Sony",
        "price": 1399,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "4K HDR OLED 120Hz display, Exmor T for mobile stacked sensor, professional Alpha camera UI."
    },
    {
        "productId": "PHN-007",
        "name": "ASUS ROG Phone 8 Pro",
        "category": "SmartPhone",
        "brandName": "ASUS",
        "price": 1199,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1546054454-aa26fe2b8744?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Ultimate gaming phone with Snapdragon 8 Gen 3, AniMe Vision mini-LED, AirTrigger buttons."
    },
    {
        "productId": "PHN-008",
        "name": "Motorola Edge+ (2023)",
        "category": "SmartPhone",
        "brandName": "Motorola",
        "price": 799,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Endless edge 165Hz OLED display, Snapdragon 8 Gen 2, 5120mAh battery, 68W TurboPower charging."
    },
    {
        "productId": "PHN-009",
        "name": "Google Pixel 7a 128GB",
        "category": "SmartPhone",
        "brandName": "Google",
        "price": 499,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Google Tensor G2, 64MP high-resolution camera, wireless charging, smooth 90Hz display."
    },
    {
        "productId": "PHN-010",
        "name": "Samsung Galaxy Z Fold 5",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 1799,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Immersive foldable 7.6-inch main screen, Flex Hinge design, multitasking powerhouse."
    },
    {
        "productId": "PHN-011",
        "name": "iPhone 15 128GB",
        "category": "SmartPhone",
        "brandName": "Apple",
        "price": 799,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dynamic Island, 48MP Main camera with 2x Telephoto, color-infused glass design, USB-C."
    },
    {
        "productId": "PHN-012",
        "name": "Samsung Galaxy Z Flip 5",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 999,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Large Flex Window cover screen, pocketable clamshell design, high-quality selfies."
    },
    {
        "productId": "PHN-013",
        "name": "OnePlus Open Foldable Phone",
        "category": "SmartPhone",
        "brandName": "OnePlus",
        "price": 1499,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Spatial audio, frictionless multitasking, Hasselblad camera tuning for foldables."
    },
    {
        "productId": "PHN-014",
        "name": "Nothing Phone (2) 256GB",
        "category": "SmartPhone",
        "brandName": "Nothing",
        "price": 699,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Unique Glyph Interface back design, Snapdragon 8+ Gen 1, Nothing OS 2.0 interface."
    },
    {
        "productId": "PHN-015",
        "name": "iPhone 14 Plus 128GB",
        "category": "SmartPhone",
        "brandName": "Apple",
        "price": 899,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "All-day battery life, 6.7-inch Super Retina XDR display, Crash Detection safety feature."
    },
    {
        "productId": "PHN-016",
        "name": "Samsung Galaxy S23 FE",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 599,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Premium flagship experience at an accessible price point, professional-grade nightography."
    },
    {
        "productId": "PHN-017",
        "name": "Google Pixel 8 128GB",
        "category": "SmartPhone",
        "brandName": "Google",
        "price": 699,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Beautiful rounded contours, Actua display, brilliant low-light video features."
    },
    {
        "productId": "PHN-018",
        "name": "Motorola Razr+ (2023)",
        "category": "SmartPhone",
        "brandName": "Motorola",
        "price": 699,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Industry-leading external cover screen, ultra-compact flip design, Flex View postures."
    },
    {
        "productId": "PHN-019",
        "name": "Vivo X100 Pro 5G",
        "category": "SmartPhone",
        "brandName": "Vivo",
        "price": 999,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Zeiss APQ telephoto camera, Dimensity 9300 processor, 120W dual-cell flash charge."
    },
    {
        "productId": "PHN-020",
        "name": "Honor Magic6 Pro",
        "category": "SmartPhone",
        "brandName": "Honor",
        "price": 1099,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Falcon capture camera system, giant 5600mAh silicon-carbon battery, Snapdragon 8 Gen 3."
    },
    {
        "productId": "PHN-021",
        "name": "iPhone SE (3rd Generation)",
        "category": "SmartPhone",
        "brandName": "Apple",
        "price": 429,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Classic form factor with Touch ID, A15 Bionic chip, 5G cellular speed capabilities."
    },
    {
        "productId": "PHN-022",
        "name": "Samsung Galaxy A54 5G",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 449,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Vibrant Super AMOLED 120Hz display, IP67 water and dust resistance, dependable battery."
    },
    {
        "productId": "PHN-023",
        "name": "Google Pixel Fold",
        "category": "SmartPhone",
        "brandName": "Google",
        "price": 1799,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "Thin book-style foldable with Google Tensor G2, polished hinge, clean Pixel software experience."
    },
    {
        "productId": "PHN-024",
        "name": "OnePlus 11 5G",
        "category": "SmartPhone",
        "brandName": "OnePlus",
        "price": 699,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Snapdragon 8 Gen 2 engine, 16GB RAM, Hasselblad camera calibration for natural color reproduction."
    },
    {
        "productId": "PHN-025",
        "name": "Xiaomi Redmi Note 13 Pro+",
        "category": "SmartPhone",
        "brandName": "Xiaomi",
        "price": 399,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "200MP OIS camera, curved AMOLED display, 120W HyperCharge technology support."
    },
    {
        "productId": "PHN-026",
        "name": "Sony Xperia 5 V",
        "category": "SmartPhone",
        "brandName": "Sony",
        "price": 999,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact creator smartphone with Exmor T sensor, full-stage stereo speakers, headphone jack."
    },
    {
        "productId": "PHN-027",
        "name": "Nothing Phone (1)",
        "category": "SmartPhone",
        "brandName": "Nothing",
        "price": 399,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "Transparent back glass design, unique light glyph notification arrays, dual 50MP cameras."
    },
    {
        "productId": "PHN-028",
        "name": "Motorola Moto G Power 5G",
        "category": "SmartPhone",
        "brandName": "Motorola",
        "price": 299,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Incredible multi-day battery endurance, 120Hz smooth display, immersive audio tuning."
    },
    {
        "productId": "PHN-029",
        "name": "Samsung Galaxy S24+ 256GB",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 999,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Stunning QHD+ flat display, Galaxy AI tools, armor aluminum frame design."
    },
    {
        "productId": "PHN-030",
        "name": "iPhone 13 128GB",
        "category": "SmartPhone",
        "brandName": "Apple",
        "price": 599,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Cinematic mode in 1080p at 30 fps, Super Retina XDR display, robust ceramic shield front."
    },
    {
        "productId": "PHN-031",
        "name": "Realme GT 5 Pro",
        "category": "SmartPhone",
        "brandName": "Realme",
        "price": 649,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Snapdragon 8 Gen 3 performance, periscope telephoto lens, lightning-fast wired and wireless charging."
    },
    {
        "productId": "PHN-032",
        "name": "Nubia RedMagic 9 Pro",
        "category": "SmartPhone",
        "brandName": "Nubia",
        "price": 749,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1546054454-aa26fe2b8744?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "True full screen with under-display camera, built-in active cooling fan, shoulder triggers."
    },
    {
        "productId": "PHN-033",
        "name": "Vivo V30 Pro",
        "category": "SmartPhone",
        "brandName": "Vivo",
        "price": 549,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Studio-quality Aura Light portrait system, co-engineered with Zeiss optics, slim profile."
    },
    {
        "productId": "PHN-034",
        "name": "Oppo Find X7 Ultra",
        "category": "SmartPhone",
        "brandName": "Oppo",
        "price": 1099,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "World's first dual periscope telephoto camera system, Hasselblad portrait mode, Snapdragon 8 Gen 3."
    },
    {
        "productId": "PHN-035",
        "name": "Poco X6 Pro 5G",
        "category": "SmartPhone",
        "brandName": "Poco",
        "price": 349,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dimensity 8300-Ultra processor, CrystalRes 1.5K Flow AMOLED display, wild performance value."
    },
    {
        "productId": "PHN-036",
        "name": "Samsung Galaxy A15 5G",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 199,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Super AMOLED display with Vision Booster, reliable triple camera setup, 5000mAh battery."
    },
    {
        "productId": "PHN-037",
        "name": "Google Pixel 7a Carbon Edition",
        "category": "SmartPhone",
        "brandName": "Google",
        "price": 499,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Smart security features, Tensor G2 chip, advanced face unlock and photo unblur tools."
    },
    {
        "productId": "PHN-038",
        "name": "iPhone 14 Pro 128GB",
        "category": "SmartPhone",
        "brandName": "Apple",
        "price": 999,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Always-On display, 48MP main camera, Dynamic Island, stainless steel band construction."
    },
    {
        "productId": "PHN-039",
        "name": "Motorola Edge 40 Neo",
        "category": "SmartPhone",
        "brandName": "Motorola",
        "price": 399,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "IP68 underwater protection, vegan leather back finish, curved 144Hz pOLED screen."
    },
    {
        "productId": "PHN-040",
        "name": "Infinix Zero 30 5G",
        "category": "SmartPhone",
        "brandName": "Infinix",
        "price": 329,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "50MP 4K 60fps front vlogging camera, curved 144Hz AMOLED screen, stylish aesthetic."
    },
    {
        "productId": "PHN-041",
        "name": "Tecno Phantom V Fold",
        "category": "SmartPhone",
        "brandName": "Tecno",
        "price": 999,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Affordable foldable alternative with aerospace-grade hinge, immersive dual displays."
    },
    {
        "productId": "PHN-042",
        "name": "Xiaomi 13T Pro",
        "category": "SmartPhone",
        "brandName": "Xiaomi",
        "price": 699,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Leica authentic imagery, 144Hz CrystalRes AMOLED display, 120W HyperCharge capability."
    },
    {
        "productId": "PHN-043",
        "name": "Samsung Galaxy S24 128GB",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 799,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact flagship profile, Live Translate AI features, robust intelligent battery management."
    },
    {
        "productId": "PHN-044",
        "name": "Google Pixel 8a",
        "category": "SmartPhone",
        "brandName": "Google",
        "price": 499,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Matte back finish, Tensor G3 chipset, amazing budget photo editing suite with Magic Eraser."
    },
    {
        "productId": "PHN-045",
        "name": "OnePlus Nord 3 5G",
        "category": "SmartPhone",
        "brandName": "OnePlus",
        "price": 449,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dimensity 9000 processor, 50MP Sony IMX890 main camera with OIS, 80W SUPERVOOC charging."
    },
    {
        "productId": "PHN-046",
        "name": "iPhone 12 64GB",
        "category": "SmartPhone",
        "brandName": "Apple",
        "price": 499,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "Ceramic Shield drop protection, dual-camera system with Night mode, A14 Bionic processor."
    },
    {
        "productId": "PHN-047",
        "name": "Motorola Edge 50 Pro",
        "category": "SmartPhone",
        "brandName": "Motorola",
        "price": 599,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Pantone validated camera and colors, 125W TurboPower charging, curved pOLED display."
    },
    {
        "productId": "PHN-048",
        "name": "Realme 12 Pro+",
        "category": "SmartPhone",
        "brandName": "Realme",
        "price": 399,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Luxury watch design elements, periscope portrait camera, Snapdragon 7s Gen 2."
    },
    {
        "productId": "PHN-049",
        "name": "Honor Magic V2",
        "category": "SmartPhone",
        "brandName": "Honor",
        "price": 1499,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Extremely thin and lightweight foldable phone, titanium hinge, dual immersive displays."
    },
    {
        "productId": "PHN-050",
        "name": "Samsung Galaxy Z Flip 6",
        "category": "SmartPhone",
        "brandName": "Samsung",
        "price": 1099,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Upgraded 50MP camera, vapor chamber cooling for the first time in Flip, Galaxy AI integration."
    },
    {
        "productId": "TV-001",
        "name": "LG C3 Series 65-inch OLED 4K Smart TV",
        "category": "TV",
        "brandName": "LG",
        "price": 1799,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Self-lit OLED pixels, α9 AI Processor Gen6, 120Hz refresh rate, Dolby Vision."
    },
    {
        "productId": "TV-002",
        "name": "Samsung 65-inch Neo QLED 4K QN90C",
        "category": "TV",
        "brandName": "Samsung",
        "price": 1599,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Quantum Matrix with Mini LEDs, Neural Quantum Processor 4K, Anti-Glare."
    },
    {
        "productId": "TV-003",
        "name": "Sony Bravia XR 65-inch A80L OLED 4K TV",
        "category": "TV",
        "brandName": "Sony",
        "price": 1999,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Cognitive Processor XR, Acoustic Surface Audio+, Google TV smart interface."
    },
    {
        "productId": "TV-004",
        "name": "TCL 65-inch QM8 QLED 4K Smart TV",
        "category": "TV",
        "brandName": "TCL",
        "price": 999,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1571415060718-dcc2a6368d37?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "High Peak Brightness Ultra, Mini-LED backlight technology, 2000+ local dimming zones."
    },
    {
        "productId": "TV-005",
        "name": "Hisense 65-inch U8K Series Mini-LED ULED TV",
        "category": "TV",
        "brandName": "Hisense",
        "price": 899,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Mini-LED PRO, 1500+ dimming zones, Quantum Dot Color, 144Hz native refresh rate."
    },
    {
        "productId": "TV-006",
        "name": "LG G3 Series 77-inch OLED evo 4K TV",
        "category": "TV",
        "brandName": "LG",
        "price": 3499,
        "rating": 4.95,
        "image": "https://images.unsplash.com/photo-1552960562-daf630e92bcc?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Brightness Booster Max, One Wall Design with zero gap, α9 AI Processor Gen6."
    },
    {
        "productId": "TV-007",
        "name": "Samsung 55-inch The Frame QLED 4K Smart TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 1399,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1601944177325-f8a9e15db7f0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Art Mode, Matte Display, Slim Fit Wall Mount included, customizable bezel frames."
    },
    {
        "productId": "TV-008",
        "name": "Sony Bravia 9 75-inch Mini LED 4K TV",
        "category": "TV",
        "brandName": "Sony",
        "price": 3999,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "XR Backlight Master Drive, cinematic brightness, Voice Zoom 3 audio enhancement."
    },
    {
        "productId": "TV-009",
        "name": "Philips 65-inch OLED808 Ambilight 4K TV",
        "category": "TV",
        "brandName": "Philips",
        "price": 1699,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "3-sided Ambilight, P5 AI Perfect Picture Engine, immersive home entertainment lighting."
    },
    {
        "productId": "TV-010",
        "name": "Panasonic 65-inch MZ2000 OLED 4K TV",
        "category": "TV",
        "brandName": "Panasonic",
        "price": 2499,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Custom Master OLED Ultimate panel, HCX Pro AI Processor, integrated Technics speakers."
    },
    {
        "productId": "TV-011",
        "name": "Samsung 85-inch QN900C Neo QLED 8K TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 4999,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Real 8K Resolution, Infinity Screen design, Neural Quantum Processor 8K."
    },
    {
        "productId": "TV-012",
        "name": "LG B3 Series 55-inch OLED 4K TV",
        "category": "TV",
        "brandName": "LG",
        "price": 1199,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Self-lit OLED pixels, α7 AI Processor Gen6, Dolby Vision, Dolby Atmos sound."
    },
    {
        "productId": "TV-013",
        "name": "Sony X90L Series 65-inch Full Array LED 4K",
        "category": "TV",
        "brandName": "Sony",
        "price": 1299,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Full Array LED brightness, Cognitive Processor XR, ideal for PS5 gaming integration."
    },
    {
        "productId": "TV-014",
        "name": "TCL 55-inch Class 6-Series QLED 4K TV",
        "category": "TV",
        "brandName": "TCL",
        "price": 649,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1571415060718-dcc2a6368d37?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Mini-LED technology, Quantum Dot performance, Roku TV or Google TV smart platform."
    },
    {
        "productId": "TV-015",
        "name": "Vizio 65-inch OLED 4K Smart TV",
        "category": "TV",
        "brandName": "Vizio",
        "price": 1099,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "True deep blacks, UltraColor Spectrum, ProGaming Engine with 120Hz variable refresh."
    },
    {
        "productId": "TV-016",
        "name": "Samsung 75-inch S95C OLED 4K Smart TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 3199,
        "rating": 4.92,
        "image": "https://images.unsplash.com/photo-1552960562-daf630e92bcc?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Quantum Dot meets OLED, Infinity One design with One Connect box, 144Hz refresh rate."
    },
    {
        "productId": "TV-017",
        "name": "LG Z3 88-inch 8K OLED Smart TV",
        "category": "TV",
        "brandName": "LG",
        "price": 19999,
        "rating": 4.98,
        "image": "https://images.unsplash.com/photo-1601944177325-f8a9e15db7f0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Real 8K self-lit OLED pixels, α9 AI Processor Gen6 8K, ultimate luxury home theater display."
    },
    {
        "productId": "TV-018",
        "name": "Hisense 55-inch U7K ULED 4K TV",
        "category": "TV",
        "brandName": "Hisense",
        "price": 599,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Mini-LED local dimming, Quantum Dot wide color gamut, Filmmaker mode optimization."
    },
    {
        "productId": "TV-019",
        "name": "Sony A95L 65-inch QD-OLED 4K TV",
        "category": "TV",
        "brandName": "Sony",
        "price": 3499,
        "rating": 4.96,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "QD-OLED panel powered by Cognitive Processor XR, immense color volume and brightness."
    },
    {
        "productId": "TV-020",
        "name": "Roku Plus Series 65-inch QLED 4K TV",
        "category": "TV",
        "brandName": "Roku",
        "price": 649,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "QLED color technology, Dolby Vision, local dimming zones, Roku Voice Remote Pro."
    },
    {
        "productId": "TV-021",
        "name": "Samsung 50-inch Crystal UHD 4K CU8000",
        "category": "TV",
        "brandName": "Samsung",
        "price": 379,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dynamic Crystal Color, Crystal Processor 4K, AirSlim profile, Smart Hub built-in."
    },
    {
        "productId": "TV-022",
        "name": "LG 50-inch UR9000 4K Smart TV",
        "category": "TV",
        "brandName": "LG",
        "price": 399,
        "rating": 4.25,
        "image": "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "α5 AI Processor Gen6 4K, webOS 23 user interface, HDR10 Pro compatibility."
    },
    {
        "productId": "TV-023",
        "name": "Toshiba 55-inch C350 Series LED 4K UHD Smart Fire TV",
        "category": "TV",
        "brandName": "Toshiba",
        "price": 329,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Regza Engine 4K, Dolby Vision HDR, Fire TV experience built right in with Alexa voice control."
    },
    {
        "productId": "TV-024",
        "name": "Insignia 43-inch F30 Series 4K Smart Fire TV",
        "category": "TV",
        "brandName": "Insignia",
        "price": 219,
        "rating": 4.0,
        "image": "https://images.unsplash.com/photo-1571415060718-dcc2a6368d37?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "4K Ultra HD resolution, DTS Studio Sound, Alexa Voice Remote inclusion."
    },
    {
        "productId": "TV-025",
        "name": "Samsung 32-inch The Serif QLED 4K TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 799,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Distinctive 360-degree iconic design by Ronan & Erwan Bouroullec, Matte Display."
    },
    {
        "productId": "TV-026",
        "name": "LG Posé 55-inch LX1 OLED Art Design TV",
        "category": "TV",
        "brandName": "LG",
        "price": 1999,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1552960562-daf630e92bcc?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Furniture-like aesthetic appearance, cable management back storage, self-lit OLED evo."
    },
    {
        "productId": "TV-027",
        "name": "Sony X85K 65-inch 4K HDR LED TV",
        "category": "TV",
        "brandName": "Sony",
        "price": 898,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1601944177325-f8a9e15db7f0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Triluminos Pro color panel, 4K HDR Processor X1, Motionflow XR refreshing."
    },
    {
        "productId": "TV-028",
        "name": "TCL Class S4 55-inch 4K LED Smart TV",
        "category": "TV",
        "brandName": "TCL",
        "price": 279,
        "rating": 4.15,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "HDR Pro with Dolby Vision, Chromecast built-in, Full HDR clarity execution."
    },
    {
        "productId": "TV-029",
        "name": "Hisense 75-inch U6K Series Mini-LED 4K TV",
        "category": "TV",
        "brandName": "Hisense",
        "price": 898,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Mini-LED local dimming array, Quantum Dot color technology, Google TV layout."
    },
    {
        "productId": "TV-030",
        "name": "Panasonic 55-inch LZ1500 OLED 4K TV",
        "category": "TV",
        "brandName": "Panasonic",
        "price": 1499,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "Professional Edition OLED panel, Game Control Board, multi-HDR format support."
    },
    {
        "productId": "TV-031",
        "name": "Samsung 65-inch Q80C QLED 4K TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 1099,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Direct Full Array backlight, Neural Quantum Processor 4K, Dolby Atmos and OTS Lite."
    },
    {
        "productId": "TV-032",
        "name": "LG 43-inch NANO75 4K NanoCell TV",
        "category": "TV",
        "brandName": "LG",
        "price": 349,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "NanoCell technology for pure colors, webOS platform, Game Optimizer dashboard."
    },
    {
        "productId": "TV-033",
        "name": "Sony Bravia XR 85-inch X95L Mini LED TV",
        "category": "TV",
        "brandName": "Sony",
        "price": 4499,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "XR Backlight Master Drive, exceptionally bright highlights, Acoustic Multi-Audio+."
    },
    {
        "productId": "TV-034",
        "name": "Philips 48-inch OLED 807 Ambilight TV",
        "category": "TV",
        "brandName": "Philips",
        "price": 1099,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1571415060718-dcc2a6368d37?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact OLED option featuring 4-sided Ambilight, IMAX Enhanced mode, P5 AI processing."
    },
    {
        "productId": "TV-035",
        "name": "Vizio 55-inch M-Series Quantum 4K TV",
        "category": "TV",
        "brandName": "Vizio",
        "price": 499,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Active Full Array backlight, Quantum Color technology, SmartCast entertainment suite."
    },
    {
        "productId": "TV-036",
        "name": "Samsung 85-inch Q60C QLED 4K TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 1799,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1552960562-daf630e92bcc?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "100% Color Volume with Quantum Dot, Quantum Processor Lite 4K, sleek profile design."
    },
    {
        "productId": "TV-037",
        "name": "LG 86-inch UR8000 4K Smart TV",
        "category": "TV",
        "brandName": "LG",
        "price": 1299,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1601944177325-f8a9e15db7f0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Massive screen dimensions, 4K upscaling engine, webOS smart hub integration."
    },
    {
        "productId": "TV-038",
        "name": "TCL 75-inch Class S5 4K LED Smart TV",
        "category": "TV",
        "brandName": "TCL",
        "price": 649,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "HDR Pro+, High Brightness LED backlight, enhanced dialogue clarity mode."
    },
    {
        "productId": "TV-039",
        "name": "Hisense 65-inch CanvasTV Art Display",
        "category": "TV",
        "brandName": "Hisense",
        "price": 1299,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Anti-glare textured screen surface, art gallery modes, teak wood interchangeable magnetic frames."
    },
    {
        "productId": "TV-040",
        "name": "Sony A80K 77-inch OLED 4K TV",
        "category": "TV",
        "brandName": "Sony",
        "price": 2799,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Cognitive Processor XR, XR OLED Contrast Pro, multi-position stand adjustability."
    },
    {
        "productId": "TV-041",
        "name": "Samsung 43-inch The Sero Rotating 4K TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 999,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Unique rotating screen that pivots between horizontal and vertical mobile viewing modes."
    },
    {
        "productId": "TV-042",
        "name": "LG 65-inch QNED85 4K Quantum Dot TV",
        "category": "TV",
        "brandName": "LG",
        "price": 1199,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "NanoCell plus Quantum Dot color mix, Precision Dimming local backlight control."
    },
    {
        "productId": "TV-043",
        "name": "Roku Pro Series 75-inch Mini-LED TV",
        "category": "TV",
        "brandName": "Roku",
        "price": 1199,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Mini-LED backlight array, sleek flat-wall mounting design, Roku smart ecosystem."
    },
    {
        "productId": "TV-044",
        "name": "Philips 65-inch OLED937 Ambilight TV",
        "category": "TV",
        "brandName": "Philips",
        "price": 2299,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1571415060718-dcc2a6368d37?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Bowers & Wilkins integrated sound system speaker base, 4-sided Ambilight technology."
    },
    {
        "productId": "TV-045",
        "name": "Xiaomi TV Q2 65-inch QLED 4K",
        "category": "TV",
        "brandName": "Xiaomi",
        "price": 699,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Quantum Dot display, MEMC smooth motion processing, Google TV voice integration."
    },
    {
        "productId": "TV-046",
        "name": "Samsung 98-inch Crystal UHD 4K Smart TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 3999,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1552960562-daf630e92bcc?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Cinematic supersized home theater display, Mega Contrast, Motion Xcelerator."
    },
    {
        "productId": "TV-047",
        "name": "LG 55-inch LX3 OLED Flex Bendable TV",
        "category": "TV",
        "brandName": "LG",
        "price": 2499,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1601944177325-f8a9e15db7f0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "World's first bendable 42/55-inch OLED screen adjustable for gaming and movie modes."
    },
    {
        "productId": "TV-048",
        "name": "Sony X75WL 55-inch 4K LED Google TV",
        "category": "TV",
        "brandName": "Sony",
        "price": 548,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "X1 4K Processor, Live Color technology, X-Balanced Speaker unit design."
    },
    {
        "productId": "TV-049",
        "name": "Hisense 85-inch U8H Quantum ULED TV",
        "category": "TV",
        "brandName": "Hisense",
        "price": 1999,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "1500+ local dimming zones, peak brightness up to 2000 nits, IMAX Enhanced certified."
    },
    {
        "productId": "TV-050",
        "name": "Samsung 65-inch S90C OLED 4K Smart TV",
        "category": "TV",
        "brandName": "Samsung",
        "price": 1899,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "OLED HDR+, Neural Quantum Processor with 4K upscaling, LaserSlim sleek frame."
    },
    {
        "productId": "SPK-001",
        "name": "Sonos Era 300 Wireless Speaker",
        "category": "Speaker",
        "brandName": "Sonos",
        "price": 449,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Spatial audio with Dolby Atmos, 6 optimal drivers, Bluetooth and WiFi connectivity."
    },
    {
        "productId": "SPK-002",
        "name": "Bose SoundLink Max Portable Speaker",
        "category": "Speaker",
        "brandName": "Bose",
        "price": 399,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Stereo sound, 20-hour battery life, IP67 waterproof and dustproof design."
    },
    {
        "productId": "SPK-003",
        "name": "JBL Charge 5 Portable Waterproof Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 179,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Optimized long excursion driver, separate tweeter, dual JBL bass radiators, 20-hour battery."
    },
    {
        "productId": "SPK-004",
        "name": "Marshall Stanmore III Bluetooth Speaker",
        "category": "Speaker",
        "brandName": "Marshall",
        "price": 379,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Iconic rock-and-roll heritage design, wider soundstage, dynamic loudness feature."
    },
    {
        "productId": "SPK-005",
        "name": "Apple HomePod (2nd Generation)",
        "category": "Speaker",
        "brandName": "Apple",
        "price": 299,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Immersive high-fidelity audio, Siri assistant built-in, smart home hub integration."
    },
    {
        "productId": "SPK-006",
        "name": "Ultimate Ears Boom 3 Portable Speaker",
        "category": "Speaker",
        "brandName": "Ultimate Ears",
        "price": 149,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "360-degree bold sound, virtually indestructible waterproof and floating design."
    },
    {
        "productId": "SPK-007",
        "name": "Sony SRS-XG300 X-Series Wireless Speaker",
        "category": "Speaker",
        "brandName": "Sony",
        "price": 349,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Powerful party sound, retractable handle, ambient lighting, IP67 water resistance."
    },
    {
        "productId": "SPK-008",
        "name": "JBL Flip 6 Waterproof Bluetooth Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 129,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Bold sound in a compact cylinder, racetrack-shaped woofer, crisp separate tweeter."
    },
    {
        "productId": "SPK-009",
        "name": "Bose SoundLink Flex Bluetooth Speaker",
        "category": "Speaker",
        "brandName": "Bose",
        "price": 149,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "PositionIQ technology detects orientation for optimal sound in any setting."
    },
    {
        "productId": "SPK-010",
        "name": "Sonos Roam 2 Ultra-Portable Smart Speaker",
        "category": "Speaker",
        "brandName": "Sonos",
        "price": 179,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dual WiFi and Bluetooth streaming, automatic Trueplay tuning, drop-resistant build."
    },
    {
        "productId": "SPK-011",
        "name": "Marshall Emberton II Portable Speaker",
        "category": "Speaker",
        "brandName": "Marshall",
        "price": 169,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact outdoor speaker featuring True Stereophonic multi-directional sound space."
    },
    {
        "productId": "SPK-012",
        "name": "JBL PartyBox 310 Portable Party Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 549,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "240 watts of monster sound, dazzling dynamic light show, smooth gliding wheels."
    },
    {
        "productId": "SPK-013",
        "name": "Harman Kardon Aura Studio 4",
        "category": "Speaker",
        "brandName": "Harman Kardon",
        "price": 329,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Stunning transparent dome design with mesmerizing diamond lighting effects, rich bass."
    },
    {
        "productId": "SPK-014",
        "name": "Bang & Olufsen Beosound A1 (2nd Gen)",
        "category": "Speaker",
        "brandName": "Bang & Olufsen",
        "price": 299,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Exquisite Danish craftsmanship, waterproof build, true 360-degree ambient sound profile."
    },
    {
        "productId": "SPK-015",
        "name": "JBL Boombox 3 Portable Bluetooth Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 499,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Massive sound output, monstrous bass response, 24-hour playtime capability."
    },
    {
        "productId": "SPK-016",
        "name": "Ultimate Ears Megaboom 3",
        "category": "Speaker",
        "brandName": "Ultimate Ears",
        "price": 199,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Deep thunderous bass, balanced audio staging, one-touch music control magic button."
    },
    {
        "productId": "SPK-017",
        "name": "Sony SRS-XB100 Ultra-Portable Speaker",
        "category": "Speaker",
        "brandName": "Sony",
        "price": 59,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Extra bass sound in a pocket-sized form factor, handy multi-way strap included."
    },
    {
        "productId": "SPK-018",
        "name": "Bose Smart Ultra Soundbar",
        "category": "Speaker",
        "brandName": "Bose",
        "price": 899,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dolby Atmos soundbar with AI Dialogue Mode to balance vocal clarity perfectly."
    },
    {
        "productId": "SPK-019",
        "name": "Sonos Arc Premium Smart Soundbar",
        "category": "Speaker",
        "brandName": "Sonos",
        "price": 899,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Cinematic spatial audio, crystal clear speech reproduction, elegant seamless chassis."
    },
    {
        "productId": "SPK-020",
        "name": "JBL Clip 4 Eco Portable Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 79,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Ultra-portable carabiner design, made with recycled plastics, surprisingly rich audio."
    },
    {
        "productId": "SPK-021",
        "name": "Marshall Acton III Bluetooth Speaker",
        "category": "Speaker",
        "brandName": "Marshall",
        "price": 279,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact home speaker packed with custom-tuned dual tweeters and angled drivers."
    },
    {
        "productId": "SPK-022",
        "name": "Amazon Echo Studio Smart Speaker",
        "category": "Speaker",
        "brandName": "Amazon",
        "price": 199,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "High-fidelity immersive audio with 5 speakers, Dolby Atmos support, room calibration."
    },
    {
        "productId": "SPK-023",
        "name": "JBL Authentics 500 Retro Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 699,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "70s-inspired Quadrex grille design, Dolby Atmos spatial audio, built-in Wi-Fi streaming."
    },
    {
        "productId": "SPK-024",
        "name": "Klipsch The Fives Powered Speakers",
        "category": "Speaker",
        "brandName": "Klipsch",
        "price": 799,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "High-end bookshelf monitors with HDMI-ARC, phono preamp, genuine wood veneer finish."
    },
    {
        "productId": "SPK-025",
        "name": "Audioengine A5+ Wireless Speakers",
        "category": "Speaker",
        "brandName": "Audioengine",
        "price": 499,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Studio-quality bookshelf stereo system, built-in power amplifiers, aptX HD Bluetooth."
    },
    {
        "productId": "SPK-026",
        "name": "Tribit StormBox Blast Portable Speaker",
        "category": "Speaker",
        "brandName": "Tribit",
        "price": 199,
        "rating": 4.72,
        "image": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "90W booming sound, deep XBass technology, synchronized party strobe lighting."
    },
    {
        "productId": "SPK-027",
        "name": "Anker Soundcore Motion Boom Plus",
        "category": "Speaker",
        "brandName": "Anker",
        "price": 149,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Outdoor stereo sound with titanium drivers, 80W output power, buoyant IP67 build."
    },
    {
        "productId": "SPK-028",
        "name": "Edifier S1000W Powered Bookshelf Speakers",
        "category": "Speaker",
        "brandName": "Edifier",
        "price": 399,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Wi-Fi multi-room streaming, titanium dome tweeters, classic solid wood side panels."
    },
    {
        "productId": "SPK-029",
        "name": "Devialet Phantom I High-End Speaker",
        "category": "Speaker",
        "brandName": "Devialet",
        "price": 3299,
        "rating": 4.95,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Breathtaking 108 dB sound pressure, ultra-dense sound with zero distortion or saturation."
    },
    {
        "productId": "SPK-030",
        "name": "KEF LSX II Wireless HiFi System",
        "category": "Speaker",
        "brandName": "KEF",
        "price": 1399,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Streaming wireless speakers with 11th Gen Uni-Q driver array for pristine acoustics."
    },
    {
        "productId": "SPK-031",
        "name": "JBL Go 4 Ultra-Compact Waterproof Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 49,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Punchy audio performance that fits right in your palm, redesigned integrated loop."
    },
    {
        "productId": "SPK-032",
        "name": "Bowers & Wilkins Zeppelin Wireless Speaker",
        "category": "Speaker",
        "brandName": "Bowers & Wilkins",
        "price": 799,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Legendary acoustic performance matched with sculptural, eye-catching design."
    },
    {
        "productId": "SPK-033",
        "name": "Bang & Olufsen Beosound Level",
        "category": "Speaker",
        "brandName": "Bang & Olufsen",
        "price": 1799,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Flexible wireless home speaker designed to adapt its acoustic performance modularly."
    },
    {
        "productId": "SPK-034",
        "name": "Polk Audio Reserve R200 Bookshelf Speakers",
        "category": "Speaker",
        "brandName": "Polk Audio",
        "price": 749,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Pinnacle ring radiator tweeter, turbine cone woofer, exceptional detail resolution."
    },
    {
        "productId": "SPK-035",
        "name": "Elac Debut 2.0 B6.2 Bookshelf Speakers",
        "category": "Speaker",
        "brandName": "ELAC",
        "price": 399,
        "rating": 4.82,
        "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Acclaimed audiophile performance with woven aramid-fiber woofer and wide-dispersion tweeter."
    },
    {
        "productId": "SPK-036",
        "name": "JBL Tuner 2 Portable FM Radio & Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 99,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Crystal clear DAB/FM radio reception alongside robust Bluetooth wireless streaming."
    },
    {
        "productId": "SPK-037",
        "name": "Sony HT-A9 Home Theater System",
        "category": "Speaker",
        "brandName": "Sony",
        "price": 1799,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Spatial sound mapping technology using 4 wireless speakers to create 12 phantom speakers."
    },
    {
        "productId": "SPK-038",
        "name": "Yamaha MusicCast 20 Wireless Speaker",
        "category": "Speaker",
        "brandName": "Yamaha",
        "price": 229,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Multi-room audio integration, clean clear vocals, versatile tabletop or wall-mount profile."
    },
    {
        "productId": "SPK-039",
        "name": "Google Nest Audio Smart Speaker",
        "category": "Speaker",
        "brandName": "Google",
        "price": 99,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Rich room-filling sound, Google Assistant voice commands, sustainable acoustic enclosure."
    },
    {
        "productId": "SPK-040",
        "name": "Amazon Echo Dot (5th Gen)",
        "category": "Speaker",
        "brandName": "Amazon",
        "price": 49,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact smart speaker with vibrant vocals, deeper bass, temperature sensor integration."
    },
    {
        "productId": "SPK-041",
        "name": "JBL Pulse 5 Waterproof Bluetooth Speaker",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 249,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Vibrant 360-degree LED light show pulsing synchronously with your favourite music tracks."
    },
    {
        "productId": "SPK-042",
        "name": "Ultimate Ears Wonderboom 3",
        "category": "Speaker",
        "brandName": "Ultimate Ears",
        "price": 99,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Surprisingly bigger 360-degree outdoor sound, outdoor boost mode, dustproof shell."
    },
    {
        "productId": "SPK-043",
        "name": "Marshall Woburn III Bluetooth Home Speaker",
        "category": "Speaker",
        "brandName": "Marshall",
        "price": 579,
        "rating": 4.86,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "The heaviest hitter in Marshall's lineup, room-filling audio system with HDMI input."
    },
    {
        "productId": "SPK-044",
        "name": "Sonos Sub Mini Wireless Subwoofer",
        "category": "Speaker",
        "brandName": "Sonos",
        "price": 429,
        "rating": 4.82,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact cylindrical subwoofer designed to eliminate buzz and deliver rich low-end punch."
    },
    {
        "productId": "SPK-045",
        "name": "Bose Portable Smart Speaker",
        "category": "Speaker",
        "brandName": "Bose",
        "price": 399,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Home speaker and Bluetooth portable speaker in one with 360-degree clear sound delivery."
    },
    {
        "productId": "SPK-046",
        "name": "JBL Cinema SB580 Dolby Atmos Soundbar",
        "category": "Speaker",
        "brandName": "JBL",
        "price": 349,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "440W power output with wireless subwoofer, dedicated center channel for crisp dialogs."
    },
    {
        "productId": "SPK-047",
        "name": "Edifier R1280T Powered Bookshelf Speakers",
        "category": "Speaker",
        "brandName": "Edifier",
        "price": 119,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Classic wooden active studio monitors with dual RCA inputs and side tone controls."
    },
    {
        "productId": "SPK-048",
        "name": "Bang & Olufsen Beosound A5",
        "category": "Speaker",
        "brandName": "Bang & Olufsen",
        "price": 1049,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Powerful Wi-Fi and Bluetooth floor/table speaker with genuine wooden handle and oak cover."
    },
    {
        "productId": "SPK-049",
        "name": "Harman Kardon Go + Play 3",
        "category": "Speaker",
        "brandName": "Harman Kardon",
        "price": 349,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Superior stereo sound performance with tempered glass touch panel and aluminum handle."
    },
    {
        "productId": "SPK-050",
        "name": "Sony SRS-RA5000 360 Reality Audio Speaker",
        "category": "Speaker",
        "brandName": "Sony",
        "price": 599,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Premium room-filling spatial audio speaker designed with seven independent drive units."
    },
    {
        "productId": "TAB-001",
        "name": "iPad Pro 13-inch M4 256GB",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 1299,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Ultra Retina XDR OLED display, Apple M4 chip, ultra-thin 5.1mm design."
    },
    {
        "productId": "TAB-002",
        "name": "Samsung Galaxy Tab S9 Ultra",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 1199,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "14.6-inch Dynamic AMOLED 2X display, S Pen included, IP68 water resistance."
    },
    {
        "productId": "TAB-003",
        "name": "Microsoft Surface Pro 11",
        "category": "Tablet",
        "brandName": "Microsoft",
        "price": 999,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Snapdragon X Elite processor, OLED display option, flexible kickstand layout."
    },
    {
        "productId": "TAB-004",
        "name": "Lenovo Tab P12 Pro",
        "category": "Tablet",
        "brandName": "Lenovo",
        "price": 699,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "12.6-inch AMOLED display, JBL quad speakers, Precision Pen 3 included in box."
    },
    {
        "productId": "TAB-005",
        "name": "Apple iPad Air 13-inch M2",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 799,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Apple M2 chip performance, Liquid Retina display, landscape stereo speakers."
    },
    {
        "productId": "TAB-006",
        "name": "OnePlus Pad 2",
        "category": "Tablet",
        "brandName": "OnePlus",
        "price": 499,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Snapdragon 8 Gen 3, 7:5 read ratio screen, fast charging battery suite."
    },
    {
        "productId": "TAB-007",
        "name": "Samsung Galaxy Tab S9+",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 999,
        "rating": 4.78,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "12.4-inch AMOLED display, Snapdragon 8 Gen 2 for Galaxy, IP68 dust and water proof."
    },
    {
        "productId": "TAB-008",
        "name": "Xiaomi Pad 6 Pro",
        "category": "Tablet",
        "brandName": "Xiaomi",
        "price": 399,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "11-inch 144Hz high refresh display, Snapdragon 8+ Gen 1, quad speaker array."
    },
    {
        "productId": "TAB-009",
        "name": "Google Pixel Tablet with Speaker Dock",
        "category": "Tablet",
        "brandName": "Google",
        "price": 499,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Hub mode speaker dock included, Google Tensor G2 processor, clean Android experience."
    },
    {
        "productId": "TAB-010",
        "name": "Amazon Fire Max 11",
        "category": "Tablet",
        "brandName": "Amazon",
        "price": 229,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Brilliant 11-inch screen, lightweight aluminum design, productivity stylus support."
    },
    {
        "productId": "TAB-011",
        "name": "Apple iPad mini (6th Generation)",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 499,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "8.3-inch Liquid Retina display, A15 Bionic chip, ultra-portable form factor."
    },
    {
        "productId": "TAB-012",
        "name": "Samsung Galaxy Tab A9+",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 219,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "11-inch smooth 90Hz display, quad speakers with Dolby Atmos, expandable storage."
    },
    {
        "productId": "TAB-013",
        "name": "Lenovo Tab Extreme",
        "category": "Tablet",
        "brandName": "Lenovo",
        "price": 1199,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Massive 14.5-inch 3K OLED screen, Dimensity 9000 processor, unique keyboard stand."
    },
    {
        "productId": "TAB-014",
        "name": "Huawei MatePad Pro 13.2",
        "category": "Tablet",
        "brandName": "Huawei",
        "price": 899,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Flexible OLED display, ultra-light chassis, NearLink stylus support."
    },
    {
        "productId": "TAB-015",
        "name": "Apple iPad (10th Generation)",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 349,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "All-screen design, A14 Bionic, landscape stereo speakers, vibrant color options."
    },
    {
        "productId": "TAB-016",
        "name": "Samsung Galaxy Tab S9 Fan Edition",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 549,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "IP68 water resistant build, S Pen included, reliable multi-tasking performance."
    },
    {
        "productId": "TAB-017",
        "name": "XPPen Artist Pro 16 Drawing Tablet",
        "category": "Tablet",
        "brandName": "XPPen",
        "price": 599,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "X3 Smart Chip stylus, fully laminated antiglare display, professional graphic design screen."
    },
    {
        "productId": "TAB-018",
        "name": "Wacom Cintiq Pro 17",
        "category": "Tablet",
        "brandName": "Wacom",
        "price": 2499,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Professional 4K creative pen display, 120Hz refresh rate, color-accurate workspace."
    },
    {
        "productId": "TAB-019",
        "name": "Honor Pad 9",
        "category": "Tablet",
        "brandName": "Honor",
        "price": 299,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "12.1-inch 120Hz 2.5K display, 8 surround audio speakers, slim metallic build."
    },
    {
        "productId": "TAB-020",
        "name": "Xiaomi Pad 6",
        "category": "Tablet",
        "brandName": "Xiaomi",
        "price": 349,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Snapdragon 870, 11-inch 144Hz display, quad stereo speakers with Dolby Atmos support."
    },
    {
        "productId": "TAB-021",
        "name": "Apple iPad Pro 11-inch M4",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 999,
        "rating": 4.92,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Ultra Retina XDR OLED panel, M4 chip performance, incredibly compact and portable."
    },
    {
        "productId": "TAB-022",
        "name": "Samsung Galaxy Tab S8",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 699,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "11-inch LTPS TFT display, Snapdragon 8 Gen 1, bundled S Pen stylus."
    },
    {
        "productId": "TAB-023",
        "name": "Lenovo Tab M11",
        "category": "Tablet",
        "brandName": "Lenovo",
        "price": 179,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Student-friendly entertainment tablet, immersive quad speakers, pen included."
    },
    {
        "productId": "TAB-024",
        "name": "Microsoft Surface Go 4",
        "category": "Tablet",
        "brandName": "Microsoft",
        "price": 599,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intel Processor N200, secure enterprise features, portable 10.5-inch footprint."
    },
    {
        "productId": "TAB-025",
        "name": "Apple iPad Air 11-inch M2",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 599,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "M2 chip speed, Liquid Retina display, front camera positioned on the landscape edge."
    },
    {
        "productId": "TAB-026",
        "name": "Amazon Fire HD 10",
        "category": "Tablet",
        "brandName": "Amazon",
        "price": 139,
        "rating": 4.25,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "10.1-inch 1080p Full HD display, brighter screen profile, fast octo-core processor."
    },
    {
        "productId": "TAB-027",
        "name": "Samsung Galaxy Tab A8",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 199,
        "rating": 4.15,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "10.5-inch screen, slim metallic body, quad speaker surround system."
    },
    {
        "productId": "TAB-028",
        "name": "Lenovo Yoga Tab 11",
        "category": "Tablet",
        "brandName": "Lenovo",
        "price": 299,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Built-in stainless steel kickstand, JBL speakers, multimedia streaming optimization."
    },
    {
        "productId": "TAB-029",
        "name": "Huion Kamvas Pro 13 (2.5K)",
        "category": "Tablet",
        "brandName": "Huion",
        "price": 399,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Pen display for digital artists, quantum dot technology, battery-free stylus pressure."
    },
    {
        "productId": "TAB-030",
        "name": "Apple iPad 9th Generation",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 329,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "10.2-inch Retina display, A13 Bionic chip, Center Stage camera feature."
    },
    {
        "productId": "TAB-031",
        "name": "Samsung Galaxy Tab S9",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 799,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "11-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2, waterproof IP68 rating."
    },
    {
        "productId": "TAB-032",
        "name": "Lenovo Tab P11 Gen 2",
        "category": "Tablet",
        "brandName": "Lenovo",
        "price": 269,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "11.5-inch 2K display with 120Hz refresh, reading mode, optional keyboard pack."
    },
    {
        "productId": "TAB-033",
        "name": "Xiaomi Pad 6S Pro 12.4",
        "category": "Tablet",
        "brandName": "Xiaomi",
        "price": 649,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Snapdragon 8 Gen 2, 3K 144Hz large screen, 120W hyper charging battery layout."
    },
    {
        "productId": "TAB-034",
        "name": "Huawei MatePad 11.5",
        "category": "Tablet",
        "brandName": "Huawei",
        "price": 299,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "120Hz FullView display, unibody metallic finish, efficient mobile processing."
    },
    {
        "productId": "TAB-035",
        "name": "Nokia T21 Tablet",
        "category": "Tablet",
        "brandName": "Nokia",
        "price": 229,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Durable build with active pen support, 3-day battery lifespan, clean software upgrades."
    },
    {
        "productId": "TAB-036",
        "name": "Samsung Galaxy Tab S6 Lite (2024)",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 329,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "S Pen included in box, immersive AKG tuned audio, portable note-taking machine."
    },
    {
        "productId": "TAB-037",
        "name": "Amazon Fire HD 8 Kids Pro",
        "category": "Tablet",
        "brandName": "Amazon",
        "price": 149,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Kid-friendly protective case, parental control dashboards, 2-year worry-free guarantee."
    },
    {
        "productId": "TAB-038",
        "name": "Alldocube iPlay 50 Mini Pro",
        "category": "Tablet",
        "brandName": "Alldocube",
        "price": 169,
        "rating": 4.25,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact 8.4-inch portable tablet, Helio G99 processor, Android multitasking performance."
    },
    {
        "productId": "TAB-039",
        "name": "Blackview Tab 18",
        "category": "Tablet",
        "brandName": "Blackview",
        "price": 249,
        "rating": 4.15,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "12-inch large 2.K screen display, Harman Kardon audio calibration, PC mode support."
    },
    {
        "productId": "TAB-040",
        "name": "Teclast T50 Pro",
        "category": "Tablet",
        "brandName": "Teclast",
        "price": 219,
        "rating": 4.05,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "MediaTek G99 chip, 11-inch 2K IPS display, quad-speaker configuration."
    },
    {
        "productId": "TAB-041",
        "name": "Apple iPad Pro 12.9-inch (6th Gen)",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 1099,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": false,
        "description": "Liquid Retina XDR mini-LED display, M2 chip, Apple Pencil hover functionality."
    },
    {
        "productId": "TAB-042",
        "name": "Samsung Galaxy Tab Active 5",
        "category": "Tablet",
        "brandName": "Samsung",
        "price": 489,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Rugged enterprise tablet, military-grade drop proof, replaceable battery, water-resistant S Pen."
    },
    {
        "productId": "TAB-043",
        "name": "Lenovo Tab P11 Pro Gen 2",
        "category": "Tablet",
        "brandName": "Lenovo",
        "price": 399,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "11.2-inch OLED 120Hz display, Kompanio 1300T processor, vibrant color reproduction."
    },
    {
        "productId": "TAB-044",
        "name": "Microsoft Surface Pro 9 (SQ3)",
        "category": "Tablet",
        "brandName": "Microsoft",
        "price": 1299,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Microsoft SQ3 ARM processor, optional 5G cellular connectivity, kickstand body design."
    },
    {
        "productId": "TAB-045",
        "name": "Honor Pad X9",
        "category": "Tablet",
        "brandName": "Honor",
        "price": 199,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "11.5-inch 120Hz display, 6-speaker layout for deep sound immersion, metal unibody."
    },
    {
        "productId": "TAB-046",
        "name": "Oppo Pad 2",
        "category": "Tablet",
        "brandName": "Oppo",
        "price": 499,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Dimensity 9000 chip, 7:5 productivity aspect ratio display, reading comfort design."
    },
    {
        "productId": "TAB-047",
        "name": "Vivo Pad 3 Pro",
        "category": "Tablet",
        "brandName": "Vivo",
        "price": 699,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Massive 13-inch 3K 144Hz display, Dimensity 9300 processor, robust audio acoustics."
    },
    {
        "productId": "TAB-048",
        "name": "Realme Pad 2",
        "category": "Tablet",
        "brandName": "Realme",
        "price": 229,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1588702547919-26b89e04225d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "11.5-inch 120Hz 2K display, sleek glowing design, long-lasting battery life."
    },
    {
        "productId": "TAB-049",
        "name": "Chuwi Hi10 XPro",
        "category": "Tablet",
        "brandName": "Chuwi",
        "price": 139,
        "rating": 3.9,
        "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Affordable entry-level tablet with 10.1-inch IPS screen and lightweight frame."
    },
    {
        "productId": "TAB-050",
        "name": "Apple iPad Pro 13-inch M4 1TB",
        "category": "Tablet",
        "brandName": "Apple",
        "price": 1799,
        "rating": 4.96,
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Nano-texture glass option, Ultra Retina XDR display, M4 chip powerhouse for professionals."
    },
    {
        "productId": "WM-001",
        "name": "LG Smart Front Load Washer with AI DD",
        "category": "Washing-Machine",
        "brandName": "LG",
        "price": 999,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "4.5 cu. ft. capacity, AI Direct Drive technology, TurboWash 360, ThinQ WiFi control."
    },
    {
        "productId": "WM-002",
        "name": "Samsung Bespoke AI Laundry Washer",
        "category": "Washing-Machine",
        "brandName": "Samsung",
        "price": 1099,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "AI OptiWash technology, Auto Dispense System, Ultra-large 5.3 cu. ft. capacity."
    },
    {
        "productId": "WM-003",
        "name": "Bosch 500 Series Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Bosch",
        "price": 1149,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "SpeedPerfect clean cycle, AquaStop leak protection, Home Connect enabled."
    },
    {
        "productId": "WM-004",
        "name": "Whirlpool Front Load Washing Machine",
        "category": "Washing-Machine",
        "brandName": "Whirlpool",
        "price": 899,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Load & Go dispenser, Sanitize cycle with Oxi, Tload smart connectivity."
    },
    {
        "productId": "WM-005",
        "name": "Maytag Front Load Washer with Extra Power",
        "category": "Washing-Machine",
        "brandName": "Maytag",
        "price": 999,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Extra Power button boosts stain fighting, 16-hr Fresh Hold option, heavy duty motor."
    },
    {
        "productId": "WM-006",
        "name": "GE Profile Smart Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "GE",
        "price": 949,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "UltraFresh Vent System with OdorBlock, Microban antimicrobial technology built-in."
    },
    {
        "productId": "WM-007",
        "name": "Electrolux Perfect Steam Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Electrolux",
        "price": 1049,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "LuxCare Plus Wash System, Adaptive Dispenser designed for all detergent types, fast 15-minute wash."
    },
    {
        "productId": "WM-008",
        "name": "LG Washtower Single Unit Vertical Laundry",
        "category": "Washing-Machine",
        "brandName": "LG",
        "price": 1999,
        "rating": 4.88,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Integrated washer and gas dryer tower design, center control panel, AI DD technology."
    },
    {
        "productId": "WM-009",
        "name": "Samsung Top Load Washer with Super Speed",
        "category": "Washing-Machine",
        "brandName": "Samsung",
        "price": 799,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "ActiveWave agitator, Super Speed wash in 28 minutes, built-in water faucet."
    },
    {
        "productId": "WM-010",
        "name": "Speed Queen TR7 Top Load Washer",
        "category": "Washing-Machine",
        "brandName": "Speed Queen",
        "price": 1399,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Commercial-grade durability, electronic controls with 8 wash cycles, industry-leading warranty."
    },
    {
        "productId": "WM-011",
        "name": "Bosch 800 Series Compact Washer",
        "category": "Washing-Machine",
        "brandName": "Bosch",
        "price": 1299,
        "rating": 4.82,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "24-inch compact stackable design, Home Connect app integration, anti-vibration circular walls."
    },
    {
        "productId": "WM-012",
        "name": "Whirlpool Top Load Washer with Built-In Water Faucet",
        "category": "Washing-Machine",
        "brandName": "Whirlpool",
        "price": 749,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Impeller design, pretreat stains directly inside the drum with an active water faucet."
    },
    {
        "productId": "WM-013",
        "name": "GE Appliances Spacemaker Portable Washer",
        "category": "Washing-Machine",
        "brandName": "GE",
        "price": 599,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Compact portable design with rollers, 2.8 cu. ft. capacity, perfect for apartment living."
    },
    {
        "productId": "WM-014",
        "name": "Miele W1 Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Miele",
        "price": 1499,
        "rating": 4.92,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Honeycombed drum design, CapDosing specialized detergent pods, TwinDos automatic dispensing."
    },
    {
        "productId": "WM-015",
        "name": "Haier Compact Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Haier",
        "price": 699,
        "rating": 4.15,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Electronic control panel with LED display, stainless steel basket, quick wash settings."
    },
    {
        "productId": "WM-016",
        "name": "LG Signature TwinWash System",
        "category": "Washing-Machine",
        "brandName": "LG",
        "price": 2499,
        "rating": 4.85,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Main front load washer combined with a mini pedestal washer for simultaneous small loads."
    },
    {
        "productId": "WM-017",
        "name": "Samsung All-in-One Washer Dryer Combo",
        "category": "Washing-Machine",
        "brandName": "Samsung",
        "price": 2199,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Bespoke AI heat pump combo washes and fully dries large loads in a single unit without venting."
    },
    {
        "productId": "WM-018",
        "name": "Maytag Pet Pro Top Load Washer",
        "category": "Washing-Machine",
        "brandName": "Maytag",
        "price": 949,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Built specifically to lift pet hair out of clothes with a specialized built-in filter system."
    },
    {
        "productId": "WM-019",
        "name": "Insignia Top Load Washer",
        "category": "Washing-Machine",
        "brandName": "Insignia",
        "price": 449,
        "rating": 4.0,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Budget-friendly 4.1 cu. ft. top load design, multiple wash cycles, transparent glass lid."
    },
    {
        "productId": "WM-020",
        "name": "Beko Front Load Washer with SteamCure",
        "category": "Washing-Machine",
        "brandName": "Beko",
        "price": 849,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "RecycledTub sustainability design, ProSmart Inverter motor, hygienic steam cleaning."
    },
    {
        "productId": "WM-021",
        "name": "GE GTW725BPNSN Top Load Washer",
        "category": "Washing-Machine",
        "brandName": "GE",
        "price": 799,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Deep fill option, Sanitize with Oxi cycle, stainless steel wash basket architecture."
    },
    {
        "productId": "WM-022",
        "name": "Whirlpool Smart All-in-One Ventless Washer Dryer",
        "category": "Washing-Machine",
        "brandName": "Whirlpool",
        "price": 1799,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Wash and dry clothes in the same compact machine with no external venting required."
    },
    {
        "productId": "WM-023",
        "name": "LG 27-inch Front Load Washer with TurboWash",
        "category": "Washing-Machine",
        "brandName": "LG",
        "price": 929,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "ColdWash technology energy savings, 5 powerful jets, smart pairing with matching dryer."
    },
    {
        "productId": "WM-024",
        "name": "Samsung 4.5 cu. ft. Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Samsung",
        "price": 849,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Steam wash eliminates tough stains without pre-treatment, Vibration Reduction Technology+."
    },
    {
        "productId": "WM-025",
        "name": "Speed Queen SF7 Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Speed Queen",
        "price": 1999,
        "rating": 4.95,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Heavy-duty commercial build for residential use, dynamic balancing system, ultra-fast spins."
    },
    {
        "productId": "WM-026",
        "name": "Maytag Commercial Technology Top Load Washer",
        "category": "Washing-Machine",
        "brandName": "Maytag",
        "price": 899,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Deep water wash option, robust power drive motor, stainless steel wash basket."
    },
    {
        "productId": "WM-027",
        "name": "Bosch 300 Series Compact Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Bosch",
        "price": 999,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "15 quick wash cycle, quiet operation with EcoSilence motor, compact 24-inch profile."
    },
    {
        "productId": "WM-028",
        "name": "GE Appliances Top Load Washer with Dual-Action Agitator",
        "category": "Washing-Machine",
        "brandName": "GE",
        "price": 699,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Robust dual-action agitator ensures comprehensive fabric turnover and cleanliness."
    },
    {
        "productId": "WM-029",
        "name": "Electrolux LuxCare Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Electrolux",
        "price": 949,
        "rating": 4.68,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Thorough mixing of water and detergent before cycle starts for ultimate stain removal."
    },
    {
        "productId": "WM-030",
        "name": "Whirlpool WFW560CHW Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Whirlpool",
        "price": 899,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "FanFresh option keeps clothes fresh in the washer for up to 12 hours after cycle ends."
    },
    {
        "productId": "WM-031",
        "name": "LG 5.0 cu. ft. Mega Capacity Top Load Washer",
        "category": "Washing-Machine",
        "brandName": "LG",
        "price": 999,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "TurboDrum technology, direct drive motor with 10-year warranty, massive laundry capacity."
    },
    {
        "productId": "WM-032",
        "name": "Samsung Ecobubble Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Samsung",
        "price": 899,
        "rating": 4.55,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Turns detergent into bubbles so it quickly enters fabric and removes dirt easily at low temps."
    },
    {
        "productId": "WM-033",
        "name": "Miele Professional Little Giant Washer",
        "category": "Washing-Machine",
        "brandName": "Miele",
        "price": 2799,
        "rating": 4.96,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Commercial-grade powerhouse designed for heavy daily cycles and extended longevity."
    },
    {
        "productId": "WM-034",
        "name": "Black+Decker Portable Compact Washing Machine",
        "category": "Washing-Machine",
        "brandName": "Black+Decker",
        "price": 319,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "1.0 cu. ft. stainless steel tub, quick connect adapter included for standard faucets."
    },
    {
        "productId": "WM-035",
        "name": "Comfee Portable Washing Machine",
        "category": "Washing-Machine",
        "brandName": "Comfee",
        "price": 289,
        "rating": 4.3,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Fully automatic machine with 1.6 cu. ft. capacity, water level selection, compact footprint."
    },
    {
        "productId": "WM-036",
        "name": "GE Profile UltraFast Combo Washer Dryer",
        "category": "Washing-Machine",
        "brandName": "GE",
        "price": 2299,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Washes and dries a large load in about 2 hours with no external venting or heavy ducting."
    },
    {
        "productId": "WM-037",
        "name": "LG Styler Steam Clothing Care System",
        "category": "Washing-Machine",
        "brandName": "LG",
        "price": 1799,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Sanitizes and refreshes delicate clothes using pure steam technology without chemical detergents."
    },
    {
        "productId": "WM-038",
        "name": "Maytag Smart Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Maytag",
        "price": 1099,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Heavy duty heavy-spin capabilities, remote start via smartphone app, heavy gauge build."
    },
    {
        "productId": "WM-039",
        "name": "Whirlpool Stackable Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Whirlpool",
        "price": 999,
        "rating": 4.5,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Sanitize cycle with internal water heater, rational space-saving modular door design."
    },
    {
        "productId": "WM-040",
        "name": "Samsung Top Load Washer with Deep Fill",
        "category": "Washing-Machine",
        "brandName": "Samsung",
        "price": 749,
        "rating": 4.35,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Select maximum water level with the touch of a button for extra-large and bulky loads."
    },
    {
        "productId": "WM-041",
        "name": "Bosch Serie 6 Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Bosch",
        "price": 1099,
        "rating": 4.75,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "ActiveOxygen technology removes bacteria without additives, highly efficient water management."
    },
    {
        "productId": "WM-042",
        "name": "LG 4.5 cu. ft. Smart Wi-Fi Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "LG",
        "price": 899,
        "rating": 4.65,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "ColdWash option saves energy, built-in sensor technology detects load characteristics."
    },
    {
        "productId": "WM-043",
        "name": "GE GTW485ASWWW Top Load Washer",
        "category": "Washing-Machine",
        "brandName": "GE",
        "price": 649,
        "rating": 4.25,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Stainless steel basket prevents rust and snagging, precise fill options for water savings."
    },
    {
        "productId": "WM-044",
        "name": "Electrolux Professional Industrial Washer",
        "category": "Washing-Machine",
        "brandName": "Electrolux",
        "price": 2899,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "High extraction force for shortened drying times, robust coin or card operated capability."
    },
    {
        "productId": "WM-045",
        "name": "Miele WCR860WPS Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Miele",
        "price": 2299,
        "rating": 4.94,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "M Touch display controls, PowerWash 2.0 system for unmatched cleaning speeds and efficiency."
    },
    {
        "productId": "WM-046",
        "name": "Hotpoint Front Load Laundry Washer",
        "category": "Washing-Machine",
        "brandName": "Hotpoint",
        "price": 599,
        "rating": 4.1,
        "image": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Straightforward reliable mechanical dial controls, durable inner drum configuration."
    },
    {
        "productId": "WM-047",
        "name": "Indesit Innex Washing Machine",
        "category": "Washing-Machine",
        "brandName": "Indesit",
        "price": 499,
        "rating": 4.2,
        "image": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Push & Go technology starts a daily 30-degree wash cycle with just one press of a button."
    },
    {
        "productId": "WM-048",
        "name": "Panasonic Front Load Washer with Econavi",
        "category": "Washing-Machine",
        "brandName": "Panasonic",
        "price": 799,
        "rating": 4.4,
        "image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Intelligent sensors detect laundry load size and water temperature to optimize resource usage."
    },
    {
        "productId": "WM-049",
        "name": "Toshiba Inverter Front Load Washer",
        "category": "Washing-Machine",
        "brandName": "Toshiba",
        "price": 749,
        "rating": 4.45,
        "image": "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "GREATWAVES technology for effective cold-water washing, ultra-quiet real inverter motor."
    },
    {
        "productId": "WM-050",
        "name": "LG Studio WashTower Vertical Laundry Solution",
        "category": "Washing-Machine",
        "brandName": "LG",
        "price": 2399,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop",
        "isAvailable": true,
        "description": "Premium metallic finish, built-in AI intelligence, centralized control panel at chest height."
    }
];

export async function populateProducts(uri?: string) {
    const targetUri = uri || mongoUri;
    try {
        console.log(`[Seed] Connecting to MongoDB at ${targetUri}...`);
        await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 5000 });
        console.log('[Seed] Connected successfully to MongoDB.');

        console.log('[Seed] Clearing existing Products...');
        await Product.deleteMany();

        console.log(`[Seed] Inserting ${sampleProducts.length} products...`);
        const result = await Product.insertMany(sampleProducts);
        console.log(`[Seed] Successfully stored ${result.length} products.`);

        await mongoose.disconnect();
        console.log('[Seed] Disconnected from MongoDB.');
        return result.length;
    } catch (error) {
        console.error('[Seed] Error seeding database:', error);
        throw error;
    }
}

// ─── Default User Seeding ────────────────────────────────────────────────────

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    hashedPassword: { type: String, required: true },
}, { timestamps: true });

// Use existing model if already registered (hot-reload safety)
const UserModel = mongoose.models['User'] || mongoose.model('User', UserSchema);

const defaultUsers = [
    {
        name: 'Test User',
        email: 'test@shopsphere.com',
        phoneNumber: '9000000001',
        password: 'Test@1234',
    },
    {
        name: 'Admin User',
        email: 'admin@shopsphere.com',
        phoneNumber: '9000000002',
        password: 'Admin@1234',
    },
];

/**
 * Seeds default users into the database if they don't already exist.
 * Call this after the NestJS app has connected to MongoDB.
 * Credentials are printed to the console for easy reference.
 */
export async function seedDefaultUsers(uri?: string) {
    const bcrypt = await import('bcrypt');
    const targetUri = uri || mongoUri;

    let shouldDisconnect = false;
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(targetUri, { serverSelectionTimeoutMS: 5000 });
        shouldDisconnect = true;
    }

    let seeded = 0;
    for (const u of defaultUsers) {
        const exists = await UserModel.findOne({ email: u.email });
        if (!exists) {
            const hashedPassword = await bcrypt.hash(u.password, 10);
            await UserModel.create({
                name: u.name,
                email: u.email,
                phoneNumber: u.phoneNumber,
                hashedPassword,
            });
            seeded++;
        }
    }

    if (seeded > 0) {
        console.log(`[UserSeed] Seeded ${seeded} default user(s).`);
        console.log('[UserSeed] ─────────────────────────────────────────');
        for (const u of defaultUsers) {
            console.log(`[UserSeed]  📧 ${u.email}  🔑 ${u.password}`);
        }
        console.log('[UserSeed] ─────────────────────────────────────────');
    } else {
        console.log('[UserSeed] Default users already exist — skipping seed.');
    }

    if (shouldDisconnect) await mongoose.disconnect();
}

if (process.argv[1] && (process.argv[1].endsWith('seed.ts') || process.argv[1].endsWith('seed.js'))) {
    populateProducts()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}