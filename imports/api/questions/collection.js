import { Mongo } from 'meteor/mongo';
import { Profiles } from '../profiles/index'

export const Questions = new Mongo.Collection('questions');

Questions.allow({
    update(userId, profile, question, fields, modifier) {
        return userId && profile.owner === userId;
    }
});

Profiles.allow({
    insert(userId, profile, question) {
        return userId && profile.owner === userId;
    },
    update(userId, profile, question, fields, modifier) {
        return userId && profile.owner === userId;
    }
});