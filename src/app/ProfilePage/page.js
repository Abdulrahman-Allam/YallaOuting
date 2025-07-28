"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, Users, Trophy, Star, Settings, Share2 } from 'lucide-react';

const UserProfile = ({
    user = {
        name: "Alex Thompson",
        handle: "@alexthompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        bio: "Adventure enthusiast and nature lover. Always looking for the next great outdoor experience. Mountain climber, hiker, and photographer capturing the beauty of the wilderness.",
        joinDate: "March 2022",
        location: "Denver, Colorado",
        stats: {
            level: 12,
            groups: 8,
            outings: 47,
            xp: 2840,
            maxXp: 3200
        },
        recentOutings: [
            {
                id: "1",
                title: "Rocky Mountain Trail",
                location: "Colorado Springs",
                date: "2024-01-15",
                participants: 12,
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
                difficulty: "Hard"
            },
            {
                id: "2",
                title: "Lake Sunrise Hike",
                location: "Boulder",
                date: "2024-01-08",
                participants: 6,
                image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
                difficulty: "Medium"
            },
            {
                id: "3",
                title: "Forest Photography Walk",
                location: "Aspen",
                date: "2024-01-02",
                participants: 8,
                image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
                difficulty: "Easy"
            }
        ],
        badges: ["Early Bird", "Group Leader", "Photo Master", "Trail Blazer"]
    }
}) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const xpPercentage = (user.stats.xp / user.stats.maxXp) * 100;

    return (
        <div className="min-h-screen p-4 md:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Section */}
                <Card className="relative overflow-hidden theme-gradient-header text-white border-2 border-yellow-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
                    <CardContent className="relative p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-background shadow-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-2xl font-bold">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">{user.name}</h1>
                                    <p className="text-lg text-muted-foreground">{user.handle}</p>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {user.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            Joined {user.joinDate}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {user.badges.map((badge, index) => (
                                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                            <Star className="w-3 h-3" />
                                            {badge}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button size="sm" className="text-white border-2 border-yellow-500" style={{ background: 'linear-gradient(to right, #19171b, #2b0307)' }}>
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                                <Button size="sm" className="text-white border-2 border-yellow-500" style={{ background: 'linear-gradient(to right, #19171b, #2b0307)' }}>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Stats and Bio */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Stats Card */}
                        <Card style={{ background: 'linear-gradient(to right, #19171b, #2b0307)' }} className="text-white border-2 border-yellow-500">
                            <CardHeader>
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    Stats
                                </h2>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-foreground">{user.stats.level}</div>
                                        <div className="text-sm text-muted-foreground">Level</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-foreground">{user.stats.groups}</div>
                                        <div className="text-sm text-muted-foreground">Groups</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-foreground">{user.stats.outings}</div>
                                        <div className="text-sm text-muted-foreground">Outings</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Experience Points</span>
                                        <span className="font-medium">{user.stats.xp} / {user.stats.maxXp}</span>
                                    </div>
                                    <Progress value={xpPercentage} className="h-2" />
                                    <div className="text-xs text-muted-foreground text-center">
                                        {user.stats.maxXp - user.stats.xp} XP to next level
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bio Card */}
                        <Card style={{ background: 'linear-gradient(to right, #19171b, #2b0307)' }} className="text-white border-2 border-yellow-500">
                            <CardHeader>
                                <h2 className="text-xl font-semibold">About</h2>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Recent Outings */}
                    <div className="lg:col-span-2">
                        <Card style={{ background: 'linear-gradient(to right, #19171b, #2b0307)' }} className="text-white border-2 border-yellow-500">
                            <CardHeader>
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-green-500" />
                                    Recent Outings
                                </h2>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.recentOutings.map((outing) => (
                                        <Card
                                            key={outing.id}
                                            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer text-white border-2 border-yellow-500"
                                            style={{ background: 'linear-gradient(to right, #19171b, #2b0307)' }}
                                        >
                                            <div className="aspect-video relative">
                                                <img
                                                    src={outing.image}
                                                    alt={outing.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <Badge
                                                    className={`absolute top-2 right-2 ${getDifficultyColor(outing.difficulty)}`}
                                                    variant="outline"
                                                >
                                                    {outing.difficulty}
                                                </Badge>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-foreground mb-2">{outing.title}</h3>
                                                <div className="space-y-1 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {outing.location}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(outing.date).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        {outing.participants} participants
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                <div className="mt-6 text-center">
                                    <Button className="text-white border-2 border-yellow-500" style={{ background: 'linear-gradient(to right, #19171b, #2b0307)' }}>
                                        View All Outings
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile; 