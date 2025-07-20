# HealthAI Backend API

A comprehensive backend API for the HealthAI healthcare assistant application.

## Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes with middleware

### 💬 AI Chat Assistant
- Health-focused chat responses
- Emergency keyword detection
- Symptom analysis and guidance
- Chat history management

### 🔍 Disease Prediction
- Symptom-based condition analysis
- AI-powered probability assessment
- Multiple condition suggestions
- Severity-based symptom tracking

### 💊 Treatment Plans
- Personalized treatment recommendations
- Home remedies and lifestyle suggestions
- Medication guidelines (non-prescriptive)
- User profile-based customization

### 📊 Health Dashboard
- Health data visualization endpoints
- Vital signs tracking
- Activity and wellness metrics
- AI-generated health insights

### 👤 User Management
- Comprehensive user profiles
- Medical history tracking
- Preferences management
- Emergency contact information

## API Endpoints

### Authentication
```
POST /api/auth/register - Register new user
POST /api/auth/login    - User login
```

### Chat Assistant
```
POST /api/chat/message           - Send chat message
GET  /api/chat/history/:userId   - Get chat history
```

### Disease Prediction
```
POST /api/prediction/analyze     - Analyze symptoms
GET  /api/prediction/symptoms    - Get common symptoms
```

### Treatment Plans
```
POST /api/treatment/generate     - Generate treatment plan
GET  /api/treatment/conditions   - Get available conditions
```

### Health Dashboard
```
GET  /api/health/dashboard/:userId    - Get dashboard data
POST /api/health/record              - Record health data
GET  /api/health/trends/:userId/:type - Get health trends
```

### User Management
```
GET  /api/user/profile/:userId       - Get user profile
PUT  /api/user/profile/:userId       - Update user profile
GET  /api/user/preferences/:userId   - Get user preferences
PUT  /api/user/preferences/:userId   - Update user preferences
```

## Installation

1. **Clone and setup:**
```bash
cd backend
npm install
```

2. **Environment setup:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start development server:**
```bash
npm run dev
```

4. **Start production server:**
```bash
npm start
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/healthai
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
AI_API_KEY=your-ai-api-key-here
```

## Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate limiting** - API request limiting
- **Input validation** - Request data validation
- **JWT authentication** - Secure token-based auth
- **Password hashing** - bcrypt password security

## Data Models

### User Profile
```javascript
{
  name: String,
  age: Number,
  gender: String,
  height: String,
  weight: String,
  conditions: [String],
  allergies: [String],
  medications: [String],
  emergencyContact: String
}
```

### Health Data
```javascript
{
  userId: String,
  type: String, // 'steps', 'sleep', 'mood', 'vitals'
  data: Object,
  timestamp: Date
}
```

### Chat Message
```javascript
{
  message: String,
  response: String,
  timestamp: Date,
  messageId: String
}
```

## Error Handling

All endpoints include comprehensive error handling:
- Input validation errors (400)
- Authentication errors (401, 403)
- Not found errors (404)
- Server errors (500)

## Testing

```bash
npm test
```

## Deployment

The backend is ready for deployment on platforms like:
- Heroku
- AWS
- Google Cloud
- DigitalOcean

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Disclaimer

This API is for educational and demonstration purposes. Always consult healthcare professionals for medical advice.