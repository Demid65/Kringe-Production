-- AlterTable
ALTER TABLE "DiscussionMessage" ADD COLUMN     "replyTargetId" INTEGER;

-- AddForeignKey
ALTER TABLE "DiscussionMessage" ADD CONSTRAINT "DiscussionMessage_replyTargetId_fkey" FOREIGN KEY ("replyTargetId") REFERENCES "DiscussionMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
