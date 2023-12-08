CREATE TABLE IF NOT EXISTS stripe_payment_intents (
    id SERIAL PRIMARY KEY,
    payment_intent_id VARCHAR(255),
    session_id VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES dining_events(id)
);
