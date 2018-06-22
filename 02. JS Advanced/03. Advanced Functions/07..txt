function patch(input) {
    switch (input) {
        case 'upvote':
            this.upvotes++;
            break;
        case 'downvote':
            this.downvotes++;
            break;
        case 'score':
            let currentUpvotes = this.upvotes;
            let currentDownvotes = this.downvotes;
            let rating = 'new';
            if (currentUpvotes + currentDownvotes >= 10) {
                if (currentUpvotes > 0.66 * (currentUpvotes + currentDownvotes)) {
                    rating = 'hot';
                } else if (currentDownvotes > currentUpvotes) {
                    rating = 'unpopular';
                } else if (currentUpvotes > 100 || currentDownvotes > 100) {
                    rating = 'controversial';
                }
            }
            if (currentUpvotes + currentDownvotes > 50) {
                let modifier = Math.ceil(0.25 * Math.max(currentDownvotes, currentUpvotes));
                currentUpvotes += modifier;
                currentDownvotes += modifier;
            }
            let score = currentUpvotes - currentDownvotes;
            return [currentUpvotes, currentDownvotes, score, rating];
    }
}