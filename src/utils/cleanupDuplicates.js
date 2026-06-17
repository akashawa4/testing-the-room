// Firestore Cleanup Utility - Remove TRUE duplicate rooms
// Only removes rooms that are EXACTLY identical in ALL fields
// Rooms from the same owner with different properties (address, rent, images, etc.) are kept

import { db, collection, getDocs, deleteDoc, doc } from '../firebase.js';

/**
 * Normalize a value for comparison
 */
const normalizeValue = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value.trim().toLowerCase();
    if (typeof value === 'number') return value.toString();
    if (Array.isArray(value)) {
        // Sort arrays and join for comparison
        return value.map(v => normalizeValue(v)).sort().join('|');
    }
    if (typeof value === 'object') {
        // Convert object to sorted key-value string
        return Object.keys(value).sort().map(k => `${k}:${normalizeValue(value[k])}`).join(',');
    }
    return String(value);
};

/**
 * Create a unique fingerprint for a room based on ALL its data fields
 * Two rooms are only duplicates if ALL these fields are identical
 */
const createRoomFingerprint = (room) => {
    // All fields that make a room unique
    const fields = [
        'title',
        'rent',
        'pricingType',
        'note',
        'contact',
        'address',
        'city',
        'college',
        'location',
        'mapLink',
        'gender',
        'roomType',
        'rooms',
        'description',
        'features',
        'images'
    ];

    // Create a fingerprint from all fields
    const fingerprint = fields.map(field => {
        const value = room[field];
        return `${field}:${normalizeValue(value)}`;
    }).join('||');

    return fingerprint;
};

/**
 * Find and remove TRUE duplicate rooms from Firestore
 * Only removes rooms where ALL fields are EXACTLY identical
 * Rooms from the same owner with ANY different field are kept
 */
export const cleanupDuplicateRooms = async () => {
    const ROOMS_COLLECTION = 'rooms';

    try {
        console.log('🔍 Scanning for TRUE duplicate rooms in Firestore...');
        console.log('📋 Checking ALL fields: title, rent, note, contact, address, location, mapLink, gender, roomType, rooms, description, features, images');

        const roomsRef = collection(db, ROOMS_COLLECTION);
        const snapshot = await getDocs(roomsRef);

        const seenRooms = new Map(); // fingerprint -> first room's document ID
        const duplicatesToDelete = [];

        snapshot.docs.forEach(docSnap => {
            const room = docSnap.data();

            // Create a complete fingerprint of ALL room data
            const fingerprint = createRoomFingerprint(room);

            if (seenRooms.has(fingerprint)) {
                // This is a TRUE duplicate (all fields match) - mark for deletion
                duplicatesToDelete.push({
                    id: docSnap.id,
                    title: room.title,
                    contact: room.contact,
                    address: room.address,
                    rent: room.rent,
                    originalId: seenRooms.get(fingerprint)
                });
            } else {
                // First occurrence or different room - keep it
                seenRooms.set(fingerprint, docSnap.id);
            }
        });

        console.log(`📊 Found ${snapshot.docs.length} total rooms`);
        console.log(`🔄 Found ${duplicatesToDelete.length} TRUE duplicate rooms to remove`);

        if (duplicatesToDelete.length === 0) {
            console.log('✅ No TRUE duplicates found! All rooms have at least one unique field.');
            return { totalRooms: snapshot.docs.length, duplicatesRemoved: 0 };
        }

        console.log('📋 TRUE Duplicates to be removed (ALL fields identical):');
        duplicatesToDelete.forEach(dup => {
            console.log(`  - "${dup.title}" at ${dup.address || 'N/A'} (ID: ${dup.id})`);
            console.log(`    Keeping original: ${dup.originalId}`);
        });

        // Delete duplicates
        console.log('🗑️ Removing TRUE duplicates...');
        for (const dup of duplicatesToDelete) {
            const roomRef = doc(db, ROOMS_COLLECTION, dup.id);
            await deleteDoc(roomRef);
            console.log(`  ✓ Deleted: ${dup.title} (${dup.id})`);
        }

        console.log(`✅ Cleanup complete! Removed ${duplicatesToDelete.length} TRUE duplicate rooms.`);

        return {
            totalRooms: snapshot.docs.length,
            duplicatesRemoved: duplicatesToDelete.length,
            remainingRooms: snapshot.docs.length - duplicatesToDelete.length
        };

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        throw error;
    }
};

/**
 * DRY RUN - Identify TRUE duplicates without deleting
 * Shows which rooms would be removed
 */
export const findDuplicateRooms = async () => {
    const ROOMS_COLLECTION = 'rooms';

    try {
        console.log('🔍 Scanning for TRUE duplicates (DRY RUN - no deletions)...');

        const roomsRef = collection(db, ROOMS_COLLECTION);
        const snapshot = await getDocs(roomsRef);

        const seenRooms = new Map();
        const duplicates = [];

        snapshot.docs.forEach(docSnap => {
            const room = docSnap.data();
            const fingerprint = createRoomFingerprint(room);

            if (seenRooms.has(fingerprint)) {
                duplicates.push({
                    id: docSnap.id,
                    title: room.title,
                    contact: room.contact,
                    address: room.address,
                    rent: room.rent,
                    gender: room.gender,
                    location: room.location,
                    originalId: seenRooms.get(fingerprint)
                });
            } else {
                seenRooms.set(fingerprint, docSnap.id);
            }
        });

        console.log(`📊 Total rooms: ${snapshot.docs.length}`);
        console.log(`🔄 TRUE duplicate rooms found: ${duplicates.length}`);

        if (duplicates.length > 0) {
            console.log('📋 TRUE Duplicates (ALL fields identical):');
            duplicates.forEach(dup => {
                console.log(`  - "${dup.title}" | Address: ${dup.address || 'N/A'} | Rent: ${dup.rent}`);
                console.log(`    Duplicate ID: ${dup.id}`);
                console.log(`    Original ID: ${dup.originalId}`);
            });
        } else {
            console.log('✅ No TRUE duplicates found!');
            console.log('   Each room has at least one unique field (address, rent, images, etc.)');
        }

        return duplicates;

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
};

/**
 * List all rooms grouped by owner (contact number)
 * Useful for debugging to see rooms from the same owner
 */
export const listRoomsByOwner = async () => {
    const ROOMS_COLLECTION = 'rooms';

    try {
        console.log('📋 Listing all rooms grouped by owner...');

        const roomsRef = collection(db, ROOMS_COLLECTION);
        const snapshot = await getDocs(roomsRef);

        const roomsByOwner = new Map();

        snapshot.docs.forEach(docSnap => {
            const room = docSnap.data();
            const contact = (room.contact || 'Unknown').trim();

            if (!roomsByOwner.has(contact)) {
                roomsByOwner.set(contact, []);
            }

            roomsByOwner.get(contact).push({
                id: docSnap.id,
                title: room.title,
                address: room.address,
                rent: room.rent,
                location: room.location,
                gender: room.gender
            });
        });

        console.log(`📊 Total owners: ${roomsByOwner.size}`);
        console.log(`📊 Total rooms: ${snapshot.docs.length}`);
        console.log('');

        // Show owners with multiple properties
        const ownersWithMultiple = [];
        roomsByOwner.forEach((rooms, contact) => {
            if (rooms.length > 1) {
                ownersWithMultiple.push({ contact, rooms });
            }
        });

        if (ownersWithMultiple.length > 0) {
            console.log(`👥 Owners with MULTIPLE properties (${ownersWithMultiple.length}):`);
            ownersWithMultiple.forEach(({ contact, rooms }) => {
                console.log(`\n📞 ${contact} - ${rooms.length} properties:`);
                rooms.forEach((room, idx) => {
                    console.log(`   ${idx + 1}. "${room.title}" | ₹${room.rent} | ${room.address || room.location || 'N/A'} | ${room.gender}`);
                });
            });
        } else {
            console.log('✅ All owners have only one property each.');
        }

        return {
            totalOwners: roomsByOwner.size,
            totalRooms: snapshot.docs.length,
            ownersWithMultiple: ownersWithMultiple
        };

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
};

export default { cleanupDuplicateRooms, findDuplicateRooms, listRoomsByOwner };

/**
 * Search for all rooms by a specific contact number
 * Useful for debugging specific owner issues
 */
export const searchRoomsByContact = async (contactNumber) => {
    const ROOMS_COLLECTION = 'rooms';

    try {
        console.log(`🔍 Searching for rooms with contact: ${contactNumber}...`);

        const roomsRef = collection(db, ROOMS_COLLECTION);
        const snapshot = await getDocs(roomsRef);

        const matchingRooms = [];

        snapshot.docs.forEach(docSnap => {
            const room = docSnap.data();
            const contact = (room.contact || '').replace(/\D/g, ''); // Remove non-digits
            const searchContact = contactNumber.replace(/\D/g, ''); // Remove non-digits

            if (contact.includes(searchContact) || searchContact.includes(contact)) {
                matchingRooms.push({
                    id: docSnap.id,
                    ...room
                });
            }
        });

        console.log(`📊 Found ${matchingRooms.length} rooms for contact ${contactNumber}:`);
        matchingRooms.forEach((room, idx) => {
            console.log(`\n${idx + 1}. ID: ${room.id}`);
            console.log(`   Title: ${room.title}`);
            console.log(`   Rent: ₹${room.rent}`);
            console.log(`   Location: ${room.location}`);
            console.log(`   Address: ${room.address || 'N/A'}`);
            console.log(`   Gender: ${room.gender}`);
            console.log(`   Note: ${room.note || 'N/A'}`);
        });

        return matchingRooms;

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
};

/**
 * Get ALL rooms from Firestore with full details
 * Useful for complete debugging
 */
export const getAllRoomsDebug = async () => {
    const ROOMS_COLLECTION = 'rooms';

    try {
        console.log('📋 Fetching ALL rooms from Firestore for debugging...');

        const roomsRef = collection(db, ROOMS_COLLECTION);
        const snapshot = await getDocs(roomsRef);

        console.log(`📊 Total rooms in Firestore: ${snapshot.docs.length}`);

        const allRooms = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
        }));

        // Group by title for easy viewing
        const groupedByTitle = {};
        allRooms.forEach(room => {
            const title = room.title || 'Unknown';
            if (!groupedByTitle[title]) {
                groupedByTitle[title] = [];
            }
            groupedByTitle[title].push(room);
        });

        // Show rooms with same title (potential owner with multiple properties)
        Object.keys(groupedByTitle).forEach(title => {
            const rooms = groupedByTitle[title];
            if (rooms.length > 1) {
                console.log(`\n🏠 "${title}" - ${rooms.length} entries:`);
                rooms.forEach((room, idx) => {
                    console.log(`   ${idx + 1}. ID: ${room.id} | ₹${room.rent} | ${room.location || room.address || 'N/A'}`);
                });
            }
        });

        return allRooms;

    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
};
