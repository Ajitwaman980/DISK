#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

// Number of vertices in the graph
const int V = 4;

// Function to calculate the minimum cost of visiting all cities
int travellingSalesmanProblem(int graph[V][V], int s) {
    // Store all vertices apart from the source vertex
    vector<int> vertices;
    for (int i = 0; i < V; i++) {
        if (i != s) {
            vertices.push_back(i);
        }
    }

    // Store the minimum cost of visiting all cities
    int minPath = INT_MAX;
    do {
        int currentPathWeight = 0;
        int k = s;

        // Calculate the path weight of the current permutation
        for (int i = 0; i < vertices.size(); i++) {
            currentPathWeight += graph[k][vertices[i]];
            k = vertices[i];
        }
        currentPathWeight += graph[k][s];

        // Update the minimum path cost
        minPath = min(minPath, currentPathWeight);

    } while (next_permutation(vertices.begin(), vertices.end()));

    return minPath;
}

int main() {
   
    int graph[V][V] = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };

    int s = 0; 
    cout << "The minimum cost of the tour is: " << travellingSalesmanProblem(graph, s) << endl;

    return 0;
}
