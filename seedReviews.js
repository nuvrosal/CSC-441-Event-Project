const mongoose = require('mongoose');
require('dotenv').config();

const EventComment = require('./models/EventComment');

const reviews = [
  // Event 1: Balboa Park Farmers Market
  { event_id: 1, name: 'Alicia', rating: 5, comment: 'Great local market with a friendly crowd and plenty of fresh produce.' },
  { event_id: 1, name: 'Brian', rating: 4, comment: 'Nice morning event. The food vendors were good and the park location made it easy to walk around.' },
  { event_id: 1, name: 'Carmen', rating: 5, comment: 'Perfect weekend stop. I liked the handmade items and family-friendly setup.' },
  { event_id: 1, name: 'Derek', rating: 4, comment: 'Good event overall. Parking took a little time, but the market was worth it.' },
  { event_id: 1, name: 'Erica', rating: 5, comment: 'Clean, organized, and fun. I would definitely go again.' },

  // Event 2: La Jolla Cove Coastal Walk
  { event_id: 2, name: 'Frank', rating: 5, comment: 'The views were excellent and the pace was easy to follow.' },
  { event_id: 2, name: 'Grace', rating: 5, comment: 'Beautiful walk along the coast. Great spot for photos and fresh air.' },
  { event_id: 2, name: 'Hector', rating: 4, comment: 'Good group activity. The area was a little busy, but still enjoyable.' },
  { event_id: 2, name: 'Isabel', rating: 5, comment: 'Loved seeing the ocean and tide pools. Very relaxing event.' },
  { event_id: 2, name: 'James', rating: 4, comment: 'Nice walk and a good way to meet people. I would recommend comfortable shoes.' },

  // Event 3: Mission Bay Kayak Meetup
  { event_id: 3, name: 'Kelly', rating: 5, comment: 'Fun meetup and beginner friendly. Mission Bay was a great location.' },
  { event_id: 3, name: 'Luis', rating: 4, comment: 'Good activity for the morning. Rentals nearby made it convenient.' },
  { event_id: 3, name: 'Maya', rating: 5, comment: 'Really enjoyed being on the water. The group made it easy for new people to join.' },
  { event_id: 3, name: 'Nathan', rating: 4, comment: 'Nice event with calm water and good instructions before heading out.' },
  { event_id: 3, name: 'Olivia', rating: 5, comment: 'Great outdoor event. I would sign up again.' },

  // Event 4: Coronado Beach Cleanup
  { event_id: 4, name: 'Paul', rating: 5, comment: 'Good community event with a clear purpose. Supplies were easy to find.' },
  { event_id: 4, name: 'Quinn', rating: 5, comment: 'I liked helping keep the beach clean. The group was friendly and organized.' },
  { event_id: 4, name: 'Rosa', rating: 4, comment: 'Worthwhile event. It felt good to help out and enjoy the beach afterward.' },
  { event_id: 4, name: 'Steven', rating: 5, comment: 'Simple, helpful, and well planned. Great volunteer opportunity.' },
  { event_id: 4, name: 'Tanya', rating: 4, comment: 'Nice cleanup event. I would bring sunscreen and water next time.' },

  // Event 5: Sunset Outdoor Movie Night
  { event_id: 5, name: 'Uma', rating: 5, comment: 'Great evening event. The outdoor movie setup was comfortable and fun.' },
  { event_id: 5, name: 'Victor', rating: 4, comment: 'Good family-friendly night. Bring a blanket or chair for sure.' },
  { event_id: 5, name: 'Wendy', rating: 5, comment: 'Loved the sunset and movie atmosphere. Very relaxed and welcoming.' },
  { event_id: 5, name: 'Xavier', rating: 4, comment: 'Nice event at Waterfront Park. Food and snacks nearby made it better.' },
  { event_id: 5, name: 'Yolanda', rating: 5, comment: 'Fun night out without spending much. I would attend again.' },

  // Event 6: Torrey Pines Hiking Group
  { event_id: 6, name: 'Zach', rating: 5, comment: 'Beautiful hike with great ocean views. The group pace was comfortable.' },
  { event_id: 6, name: 'Amber', rating: 4, comment: 'Good moderate hike. A few hills, but nothing too difficult.' },
  { event_id: 6, name: 'Chris', rating: 5, comment: 'Torrey Pines is always a great choice. The meetup was well organized.' },
  { event_id: 6, name: 'Denise', rating: 5, comment: 'Great scenery and friendly people. I liked the early start time.' },
  { event_id: 6, name: 'Evan', rating: 4, comment: 'Nice hike. Parking can be tight, so arriving early helps.' },

  // Event 7: Pacific Beach Surf Session
  { event_id: 7, name: 'Felicia', rating: 5, comment: 'Fun surf session and good for beginners. Everyone was encouraging.' },
  { event_id: 7, name: 'George', rating: 4, comment: 'Good waves and a relaxed group. I would bring extra water next time.' },
  { event_id: 7, name: 'Hannah', rating: 5, comment: 'Great beach activity. It was nice having different skill levels in the group.' },
  { event_id: 7, name: 'Ivan', rating: 4, comment: 'Solid meetup. Easy location and plenty of room on the beach.' },
  { event_id: 7, name: 'Jasmine', rating: 5, comment: 'Really fun morning. I felt comfortable even as a newer surfer.' },

  // Event 8: Liberty Station Food Truck Friday
  { event_id: 8, name: 'Kevin', rating: 5, comment: 'Great food options and a nice evening atmosphere.' },
  { event_id: 8, name: 'Laura', rating: 4, comment: 'Good variety of food trucks. The outdoor seating area worked well.' },
  { event_id: 8, name: 'Marcus', rating: 5, comment: 'Fun place to hang out with friends. Lots of choices and good music.' },
  { event_id: 8, name: 'Nina', rating: 4, comment: 'Nice Friday event. Lines were a little long, but the food was worth it.' },
  { event_id: 8, name: 'Oscar', rating: 5, comment: 'Relaxed and easy event. Liberty Station is a great location for this.' },

  // Event 9: Seaport Village Music Walk
  { event_id: 9, name: 'Patricia', rating: 5, comment: 'Enjoyed the music and waterfront views. Very easygoing event.' },
  { event_id: 9, name: 'Ray', rating: 4, comment: 'Good spot for a casual afternoon. The performers added a nice touch.' },
  { event_id: 9, name: 'Samantha', rating: 5, comment: 'Fun walk with shopping, music, and a great view of the bay.' },
  { event_id: 9, name: 'Tony', rating: 4, comment: 'Nice event for visitors or locals. It was simple but enjoyable.' },
  { event_id: 9, name: 'Vanessa', rating: 5, comment: 'Loved the waterfront setting. Great way to spend the afternoon.' },

  // Event 10: Mission Trails Nature Hike
  { event_id: 10, name: 'Will', rating: 5, comment: 'Great nature hike with plenty of space and good trail views.' },
  { event_id: 10, name: 'Bianca', rating: 4, comment: 'Nice guided hike. I liked learning about the local plants and trails.' },
  { event_id: 10, name: 'Carlos', rating: 5, comment: 'Good outdoor activity and not too difficult. The guide kept it interesting.' },
  { event_id: 10, name: 'Monica', rating: 4, comment: 'Enjoyed the hike. Bring water because it can get warm on the trail.' },
  { event_id: 10, name: 'Andre', rating: 5, comment: 'Very good event for getting outside and seeing more of San Diego.' }
];

async function seedReviews() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from the .env file.');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await EventComment.deleteMany({});
    await EventComment.insertMany(reviews);

    console.log(`Added ${reviews.length} reviews to MongoDB.`);
  } catch (error) {
    console.error('Error seeding reviews:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

seedReviews();
