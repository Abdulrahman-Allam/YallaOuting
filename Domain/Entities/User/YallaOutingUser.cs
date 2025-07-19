namespace Domain.Entities.User
{
    public class YallaOutingUser
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public int XpLevel { get; set; } = 1;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Role { get; set; } = "User"; // User, Admin, Moderator
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;
        
        // Navigation properties for hangouts
        public virtual ICollection<Hangout>? CreatedHangouts { get; set; }
        public virtual ICollection<HangoutParticipant>? HangoutParticipations { get; set; }
    }
}