import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/Globalprovider";
import { getComments } from "@/lib/appwrite";

interface Comment {
  $id: string;
  comment: string;
  blogId: string;
  userId: string;
}

interface AllCommentsProps {
    blogId: string;
}

const AllComments: React.FC<AllCommentsProps> = ({ blogId }) => {
    const { user } = useGlobalContext();

    if (user === null) {
        router.replace("/(auth)/sign-in");
        return null;
    }

    const [comments, setComments] = useState<Comment[]>([]);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    const getData = async () => {
        const documents = await getComments(blogId);
        const data: Comment[] = documents.map((doc: any) => ({
            $id: doc.$id,
            comment: doc.comment,
            blogId: doc.blogId,
            userId: doc.userId,
        }));
        setComments(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const refetch = async () => getData();

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    };

    return (
        <FlatList
            data={comments}
            keyExtractor={(item) => item.$id}
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
                <View className="flex flex-row items-center p-4">
                    <Text className="ml-2 text-sm text-gray-600">{item.comment}</Text>
                </View>
            )}
        />
    );
};

export default AllComments;
