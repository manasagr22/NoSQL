const menuItems = [
    {
        title: "User Analysis",
        url: "/home",
        submenu: [
            {
                title: "Tweets",
                url: "/0101/user-analysis/TweetsfromDoctors"
            },
            {
                title: "Post Covid Joining",
                url: "/0101/user-analysis/PostCovid"
            }
        ]
    },
    {
        title: "Hashtag Analysis",
        url: "/home",
        submenu: [
            {
                title: "All Users",
                url: "/home",
                submenu: [
                    {
                        title: "Line Chart",
                        url: "/0110/hashtag-analysis/allUsers/lineChart"
                    },
                    {
                        title: "Tabular",
                        url: "/0110/hashtag-analysis/allUsers/tabular"
                    }
                ]
            },
            {
                title: "Most Influencial Users",
                url: "/0110/hashtag-analysis/InfluencialUsers"
            }
        ]
    },
    {
        title: "Temporal Analysis",
        url: "/home",
        submenu: [
            {
                title: "Popular Hashtags",
                url: "/0111/temporal-analysis/PossibleWeeks"
            },
            {
                title: "Tweet Frequency",
                url: "/0111/temporal-analysis/TweetFrequency"
            },
            {
                title: "Connected People",
                url: "/0111/temporal-analysis/connectedPeople"
            }
        ]
    }
]

export default menuItems;