CREATE TABLE `guest_book` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guest_book_email_unique` ON `guest_book` (`email`);