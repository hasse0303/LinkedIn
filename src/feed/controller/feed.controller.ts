import { Body, Controller, Get, Param, Post,Put, Query, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../service/feed.service';

@Controller('feed')
export class FeedController {
    constructor(
        private feedService: FeedService
    ){}

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() post: FeedPost, @Request() req): Observable<FeedPost>{
        return this.feedService.createPost(req.user,post);
    }

    // @Get()
    // getAll(): Observable<FeedPost[]>{
    //     return this.feedService.getAllPost();
    // }

    @Get()
    findSelected(@Query('max') max: number, @Query('offset') offset: number, @Query('order') order: any = 'DESC'): Observable<FeedPost[]>{
        max = max > 20 ? 20 : max;
        return this.feedService.getPosts(max,offset,order);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() feedPost: FeedPost
    ): Observable<UpdateResult>{
        return this.feedService.updatePost(id, feedPost);
    }
}
