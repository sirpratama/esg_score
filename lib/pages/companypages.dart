import 'package:flutter/material.dart';

class CompanyPages extends StatefulWidget {
  const CompanyPages({super.key});

  @override
  State<CompanyPages> createState() => _CompanyPagesState();
}

class _CompanyPagesState extends State<CompanyPages> {
  void _showAddESGDialog() {
    final _titleController = TextEditingController();
    final _scoreController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add ESG Report'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _titleController,
              decoration: const InputDecoration(labelText: 'Report Title'),
            ),
            TextField(
              controller: _scoreController,
              decoration: const InputDecoration(labelText: 'ESG Score'),
              keyboardType: TextInputType.number,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('ESG Report "${_titleController.text}" added!')),
              );
            },
            child: const Text('Submit'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Company Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Welcome, Company!'),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _showAddESGDialog,
              icon: const Icon(Icons.add_chart),
              label: const Text('Add ESG Report'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFE6FF6A),
                foregroundColor: Color(0xFF2B3A2B),
                textStyle: const TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
