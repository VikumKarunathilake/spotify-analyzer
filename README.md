Create a React + Vite + TypeScript Spotify User Insights Dashboard that provides deep, visually appealing analytics about a user's music listening habits. The dashboard should include the following features:

📊 Dashboard Components:
1. Top Tracks Section
   - Display top 10 most listened tracks
   - Show track artwork, name, artist, and total play count
   - Sortable by different time ranges (last month, 6 months, all time)

2. Top Artists Section
   - Showcase top artists with their profile images
   - Include total listening time for each artist
   - Genre distribution visualization
   - Ability to drill down into artist details

3. Listening Time Analytics
   - Breakdown of total listening time
   - Time spent by genre
   - Time spent by day of week
   - Time spent by time of day
   - Comparative charts showing listening trends

4. Music Personality Insights
   - Generate a "music personality" based on listening habits
   - Show dominant genres
   - Highlight unique listening characteristics
   - Comparison with global/friend averages if possible

5. Mood and Energy Analysis
   - Aggregate track audio features (danceability, energy, valence)
   - Visualize mood progression over time
   - Identify most common audio characteristics in user's top tracks

🔧 Technical Requirements:
- Use Spotify Web API for data retrieval
- Implement secure token-based authentication
- Create responsive, mobile-friendly design
- Use modern React hooks and functional components
- Implement TypeScript for type safety
- Use recharts or visx for data visualizations
- Use lient-side rendering for time (i dont have backend server)

📦 Additional Features:
- Animated, interactive charts
- Caching of API responses to reduce unnecessary calls

🔒 Authentication:
- Secure Spotify OAuth flow
- Token management
- Refresh token handling
- Logout functionality

💡 Bonus Points:
- Implement lient-side rendering for initial load performance
- Add accessibility features
- Create custom hooks for Spotify API interactions
- Implement