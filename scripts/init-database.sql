-- Initialize the bus station database
-- Drop existing tables if they exist
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    full_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create routes table
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    number VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    start_point VARCHAR(100) NOT NULL,
    end_point VARCHAR(100) NOT NULL,
    stops INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    is_accessible BOOLEAN DEFAULT false,
    is_express BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create alerts table
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(20) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    affected_routes TEXT[] NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create schedules table
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    time VARCHAR(10) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    route VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'on-time',
    day VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert demo user (admin)
INSERT INTO users (username, email, password_hash, role, full_name, phone) VALUES
('admin', 'admin@busstation.com', '$2b$10$demo_hash_for_password_123', 'admin', 'System Administrator', '+20123456789'),
('demo_user', 'user@busstation.com', '$2b$10$demo_hash_for_password_user', 'user', 'Demo User', '+20987654321');

-- Insert sample routes
INSERT INTO routes (number, name, frequency, start_point, end_point, stops, status, is_accessible, is_express) VALUES
('42', 'Downtown Express', 'Every 10 min', 'Central Station', 'Business District', 18, 'active', true, true),
('15', 'Airport Shuttle', 'Every 15 min', 'Central Station', 'International Airport', 12, 'active', true, false),
('37', 'University Line', 'Every 12 min', 'Downtown', 'University Campus', 24, 'active', true, false),
('8', 'Coastal Route', 'Every 20 min', 'Harbor Terminal', 'Beach Resort', 15, 'limited', false, false),
('53', 'Shopping Mall Express', 'Every 15 min', 'Central Station', 'Metro Mall', 9, 'active', true, true),
('101', 'School Route A', 'Every 30 min', 'Residential Area', 'International School', 8, 'active', true, false),
('102', 'School Route B', 'Every 30 min', 'New Cairo', 'British School', 12, 'active', true, false);

-- Insert sample alerts
INSERT INTO alerts (title, description, type, severity, affected_routes, status) VALUES
('Route 42 Detour', 'Due to road construction on Main Street, Route 42 is currently on detour via Oak Avenue and Pine Street. Expect delays of 5-10 minutes.', 'detour', 'medium', ARRAY['42'], 'active'),
('Service Disruption on Route 15', 'Due to a traffic accident, Route 15 is experiencing significant delays. Buses may be delayed by up to 20 minutes.', 'delay', 'high', ARRAY['15'], 'active'),
('Schedule Change for Route 37', 'Starting next week, Route 37 will operate on a new schedule with increased frequency during peak hours.', 'schedule', 'low', ARRAY['37'], 'active'),
('Central Station Maintenance', 'The north entrance of Central Station will be closed for maintenance from 10 PM to 5 AM tonight. Please use the south entrance during this time.', 'station', 'medium', ARRAY['42', '15', '37', '53'], 'active'),
('Holiday Schedule', 'All buses will operate on a Sunday schedule for the upcoming holiday on June 19th.', 'schedule', 'low', ARRAY['all'], 'active');

-- Insert sample schedules
INSERT INTO schedules (time, destination, route, status, day) VALUES
('06:00', 'Downtown', '42', 'on-time', 'weekday'),
('06:15', 'Airport', '15', 'on-time', 'weekday'),
('06:30', 'University', '37', 'on-time', 'weekday'),
('06:45', 'Downtown', '42', 'on-time', 'weekday'),
('07:00', 'Beach Resort', '8', 'on-time', 'weekday'),
('07:15', 'Airport', '15', 'delayed', 'weekday'),
('07:30', 'University', '37', 'on-time', 'weekday'),
('07:45', 'Downtown', '42', 'on-time', 'weekday'),
('08:00', 'Metro Mall', '53', 'on-time', 'weekday'),
('07:30', 'International School', '101', 'on-time', 'weekday'),
('08:00', 'British School', '102', 'on-time', 'weekday'),
('07:00', 'Downtown', '42', 'on-time', 'saturday'),
('07:30', 'Airport', '15', 'on-time', 'saturday'),
('08:00', 'University', '37', 'on-time', 'saturday'),
('08:00', 'Downtown', '42', 'on-time', 'sunday'),
('09:00', 'Airport', '15', 'on-time', 'sunday'),
('10:00', 'University', '37', 'on-time', 'sunday');
